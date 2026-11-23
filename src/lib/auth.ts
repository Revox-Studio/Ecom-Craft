import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "admin_session";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecretKey(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "ecom_craft_fallback_secret_key_change_in_production_2026"
  );
}

// Convert string to base64url
function toBase64Url(str: string): string {
  if (typeof btoa === "function") {
    return btoa(str)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// Convert base64url to string
function fromBase64Url(b64url: string): string {
  const padded = b64url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(b64url.length + ((4 - (b64url.length % 4)) % 4), "=");
  if (typeof atob === "function") {
    return atob(padded);
  }
  return Buffer.from(padded, "base64").toString("utf-8");
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/**
 * Creates a signed HMAC session token
 */
export async function createSessionToken(email: string): Promise<string> {
  const secret = getSecretKey();
  const payload = {
    email,
    iat: Date.now(),
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const payloadString = JSON.stringify(payload);
  const dataB64 = toBase64Url(payloadString);

  const enc = new TextEncoder();
  const key = await getCryptoKey(secret);
  const sigBuffer = await crypto.subtle.sign("HMAC", key, enc.encode(dataB64));

  const sigB64 = toBase64Url(
    String.fromCharCode(...new Uint8Array(sigBuffer))
  );

  return `${dataB64}.${sigB64}`;
}

/**
 * Verifies a signed HMAC session token and returns the payload if valid
 */
export async function verifySessionToken(
  token: string | undefined | null
): Promise<{ email: string; exp: number } | null> {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [dataB64, sigB64] = parts;
    const secret = getSecretKey();
    const key = await getCryptoKey(secret);

    // Reconstruct signature bytes
    const sigStr = fromBase64Url(sigB64);
    const sigBytes = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBytes[i] = sigStr.charCodeAt(i);
    }

    const enc = new TextEncoder();
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      enc.encode(dataB64)
    );

    if (!isValid) return null;

    const payload = JSON.parse(fromBase64Url(dataB64));
    if (!payload.exp || Date.now() > payload.exp) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}

/**
 * Validates given email and password against .env configuration
 */
export function validateAdminCredentials(
  email: string,
  pass: string
): boolean {
  const expectedEmail = (process.env.ADMIN_EMAIL || "admin@ecomcraft.com").trim();
  const expectedPassword = (process.env.ADMIN_PASSWORD || "admin_craft_2026").trim();

  return (
    email.trim().toLowerCase() === expectedEmail.toLowerCase() &&
    pass === expectedPassword
  );
}

/**
 * Helper to check if incoming request carries a valid admin session cookie
 */
export async function isAuthorizedAdmin(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  return Boolean(session);
}
