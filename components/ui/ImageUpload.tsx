// components/ui/ImageUpload.tsx
"use client";

import { useState } from "react";

export default function ImageUpload({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        onChange(data.url);
      } else {
        setError("আপলোড ব্যর্থ হয়েছে");
      }
    } catch (err) {
      setError("আপলোড করতে সমস্যা হয়েছে");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}

      {value && (
        <img
          src={value}
          alt="Preview"
          className="mb-3 h-40 w-40 rounded-lg object-cover border"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
      />

      {uploading && (
        <p className="mt-2 text-sm text-slate-500">আপলোড হচ্ছে...</p>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
