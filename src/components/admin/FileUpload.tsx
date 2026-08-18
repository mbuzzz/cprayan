"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, X, File, Image as ImageIcon, Loader2, Plus } from "lucide-react";

interface FileUploadProps {
  value: string; // JSON array string e.g. '["/uploads/1.png"]' or single URL string
  onChange: (val: string) => void;
  multiple?: boolean;
  accept?: string;
  label?: string;
  helperText?: string;
}

export default function FileUpload({
  value,
  onChange,
  multiple = false,
  accept = "image/*",
  label = "Upload File",
  helperText = "Drag & drop file di sini atau klik untuk memilih.",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse current value
  let fileList: string[] = [];
  if (value) {
    if (value.startsWith("[")) {
      try {
        fileList = JSON.parse(value);
      } catch {
        fileList = [value];
      }
    } else {
      fileList = [value];
    }
  }

  const handleUpload = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadError(null);

    const newUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          newUrls.push(data.url);
        } else {
          setUploadError(data.error || "Gagal mengunggah file.");
        }
      } catch (err: any) {
        setUploadError(err.message || "Terjadi kesalahan upload.");
      }
    }

    if (newUrls.length > 0) {
      if (multiple) {
        const updated = [...fileList, ...newUrls];
        onChange(JSON.stringify(updated));
      } else {
        onChange(newUrls[0]);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    if (multiple) {
      const updated = fileList.filter((_, i) => i !== index);
      onChange(JSON.stringify(updated));
    } else {
      onChange("");
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleUpload(e.dataTransfer.files);
    }
  };

  const isImageFile = (url: string) => {
    return /\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i.test(url) || url.startsWith("/asset/");
  };

  return (
    <div className="space-y-3">
      {label && <label className="block text-sm font-medium text-[#e3e2e2]">{label}</label>}

      {/* Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-[#f2ca50] bg-[#1f2020]"
            : "border-[#4d4635]/50 bg-[#121414] hover:border-[#f2ca50]/70 hover:bg-[#1b1c1c]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="hidden"
        />

        {isUploading ? (
          <div className="flex flex-col items-center justify-center space-y-2 text-[#f2ca50]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-mono tracking-wider">Mengunggah berkas...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-[#d0c5af]">
            <UploadCloud className="w-8 h-8 text-[#f2ca50] opacity-80" />
            <p className="text-xs font-medium text-[#e3e2e2]">
              Klik untuk memilih berkas atau drag & drop
            </p>
            <p className="text-[11px] text-[#858585]">{helperText}</p>
          </div>
        )}
      </div>

      {uploadError && (
        <p className="text-xs text-red-400 font-mono bg-red-950/40 border border-red-800/50 p-2 rounded">
          {uploadError}
        </p>
      )}

      {/* File Previews */}
      {fileList.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-mono text-[#858585] uppercase tracking-wider block">
            Berkas Terlampir ({fileList.length}):
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {fileList.map((url, idx) => (
              <div
                key={idx}
                className="relative group bg-[#1b1c1c] border border-[#4d4635]/40 rounded p-2 flex flex-col justify-between overflow-hidden"
              >
                {isImageFile(url) ? (
                  <div className="aspect-video w-full overflow-hidden rounded bg-black/40 mb-2 relative">
                    <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-full object-contain" />
                    {idx === 0 && multiple && (
                      <span className="absolute top-1 left-1 bg-[#f2ca50] text-[#080808] text-[9px] font-mono font-bold px-1.5 py-0.5 rounded">
                        Cover
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="aspect-video w-full flex flex-col items-center justify-center bg-black/30 rounded mb-2 text-[#f2ca50]">
                    <File className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-mono truncate max-w-[90%] text-[#d0c5af]">
                      {url.split("/").pop()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-1 text-[11px] text-[#858585]">
                  <span className="truncate max-w-[80%] font-mono text-[10px]" title={url}>
                    {url.split("/").pop()}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    className="text-red-400 hover:text-red-300 p-0.5 rounded hover:bg-red-950/50 transition-colors"
                    title="Hapus berkas"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
