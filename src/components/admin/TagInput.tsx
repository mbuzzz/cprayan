"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  value: string; // JSON string array e.g. '["Next.js", "Tailwind"]'
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
}

export default function TagInput({
  value,
  onChange,
  label = "Tags",
  placeholder = "Ketik lalu tekan Enter (misal: Next.js, Tailwind)...",
  helperText = "Tekan Enter atau klik Tambah untuk memasukkan tag.",
}: TagInputProps) {
  const [inputVal, setInputVal] = useState("");

  let tags: string[] = [];
  if (value) {
    try {
      if (value.startsWith("[")) {
        tags = JSON.parse(value);
      } else {
        tags = value.split(",").map((s) => s.trim()).filter(Boolean);
      }
    } catch {
      tags = [];
    }
  }

  const addTag = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      const updated = [...tags, trimmed];
      onChange(JSON.stringify(updated));
    }
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (idxToRemove: number) => {
    const updated = tags.filter((_, idx) => idx !== idxToRemove);
    onChange(JSON.stringify(updated));
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-[#e3e2e2]">{label}</label>}

      {/* Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 bg-[#121414] border border-[#4d4635]/40 rounded-md px-4 py-2.5 text-sm text-[#e3e2e2] placeholder:text-[#858585] focus:outline-none focus:border-[#f2ca50] transition-colors font-mono"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2.5 bg-[#1b1c1c] border border-[#4d4635]/50 text-[#f2ca50] hover:bg-[#f2ca50] hover:text-[#080808] font-mono text-xs uppercase font-bold rounded-md flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </div>

      {/* Tag Badges */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1b1c1c] border border-[#4d4635]/50 rounded text-xs font-mono text-[#e3e2e2] group"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(idx)}
                className="text-[#858585] hover:text-red-400 p-0.5 rounded transition-colors"
                title="Hapus tag"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {helperText && <p className="text-[11px] text-[#858585]">{helperText}</p>}
    </div>
  );
}
