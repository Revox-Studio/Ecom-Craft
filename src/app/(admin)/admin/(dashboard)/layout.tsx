import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import AdminSidebar from "@/components/admin/sidebar/admin-sidebar";
import AdminHeader from "@/components/admin/header/admin-header";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  // Strict server-side authentication guard:
  // If no valid session token exists, immediately redirect to /admin/login
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#faf7f2]">
      <AdminSidebar adminEmail={session.email} />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader adminEmail={session.email} />
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full">{children}</main>
      </div>
    </div>
  );
}
