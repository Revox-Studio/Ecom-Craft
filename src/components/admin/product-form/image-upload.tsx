"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, X, Star, AlertCircle, Loader2 } from "lucide-react";
import { getPublicImageUrl } from "@/lib/image-url";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
}

export default function ImageUpload({
  images,
  onChange,
  maxFiles = 6,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    setUploading(true);
    setError(null);

    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setError(`"${file.name}" is not a supported image file.`);
        continue;
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to upload image");
        }

        if (data.url) {
          uploadedUrls.push(data.url);
        }
      } catch (err: unknown) {
        console.error("Upload error:", err);
        setError(
          err instanceof Error
            ? err.message
            : `Failed to upload "${file.name}" to S3 storage.`
        );
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([...images, ...uploadedUrls]);
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const urlToRemove = images[indexToRemove];
    const newImages = images.filter((_, idx) => idx !== indexToRemove);
    onChange(newImages);

    // Call S3 delete endpoint in background to clean up immediately
    try {
      if (urlToRemove && !urlToRemove.startsWith("/images/")) {
        await fetch(
          `/api/upload?url=${encodeURIComponent(urlToRemove)}`,
          { method: "DELETE" }
        );
      }
    } catch (e) {
      console.warn("Could not immediately delete image from S3:", e);
    }
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const target = images[indexToPrimary];
    const rest = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([target, ...rest]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-brand-dark/70">
          Product Images (Stored in Neon S3 Bucket)
        </label>
        <span className="text-[11px] text-brand-dark/50">
          {images.length} of {maxFiles} uploaded
        </span>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of uploaded images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((url, idx) => (
          <div
            key={url + idx}
            className="group relative aspect-square rounded-2xl overflow-hidden border border-brand-dark/15 bg-brand-dark/5 shadow-sm"
          >
            <img
              src={getPublicImageUrl(url)}
              alt={`Product preview ${idx + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Primary badge */}
            {idx === 0 ? (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-brand-primary text-white text-[10px] font-bold uppercase tracking-wider shadow">
                Cover
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleSetPrimary(idx)}
                title="Make primary cover image"
                className="absolute top-2 left-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-brand-primary"
              >
                <Star className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              title="Delete image from S3"
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* S3 Badge */}
            <div className="absolute bottom-1 right-2 text-[9px] font-mono font-semibold text-white/80 drop-shadow">
              S3
            </div>
          </div>
        ))}

        {/* Upload drop button */}
        {images.length < maxFiles && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center aspect-square rounded-2xl border-2 border-dashed border-brand-dark/20 bg-brand-dark/[0.02] hover:bg-brand-primary/5 hover:border-brand-primary/50 transition-all text-brand-dark/60 hover:text-brand-primary p-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin text-brand-primary mb-2" />
                <span className="text-xs font-semibold">Uploading to S3...</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-7 h-7 mb-2 stroke-[1.5]" />
                <span className="text-xs font-bold">Upload to S3</span>
                <span className="text-[10px] text-brand-dark/40 mt-1">PNG, JPG, WEBP</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />
    </div>
  );
}
