"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  RemoveFormatting,
  Eye,
  Code2,
  Upload,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis konten lengkap di sini...",
  minHeight = "240px",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Sync value from props to contentEditable element
  useEffect(() => {
    if (editorRef.current && !isSourceMode) {
      if (editorRef.current.innerHTML !== (value || "")) {
        editorRef.current.innerHTML = value || "";
      }
    }
  }, [value, isSourceMode]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const exec = (command: string, val: string | undefined = undefined) => {
    if (isSourceMode) return;
    document.execCommand(command, false, val);
    handleInput();
    editorRef.current?.focus();
  };

  const handleInsertLink = () => {
    const url = prompt("Masukkan URL tautan (misal: https://example.com):");
    if (url) {
      exec("createLink", url);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.url) {
        exec("insertImage", data.url);
      } else {
        alert(data.error || "Gagal mengunggah gambar.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border border-[#4d4635]/40 rounded-lg overflow-hidden bg-[#121414] focus-within:border-[#f2ca50] transition-colors">
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#1b1c1c] border-b border-[#4d4635]/30 text-[#d0c5af]">
        {/* Text Style */}
        <button
          type="button"
          onClick={() => exec("bold")}
          title="Tebal (Ctrl+B)"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("italic")}
          title="Miring (Ctrl+I)"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("underline")}
          title="Garis Bawah (Ctrl+U)"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("strikeThrough")}
          title="Coret"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-4 bg-[#4d4635]/40 mx-1"></span>

        {/* Headings */}
        <button
          type="button"
          onClick={() => exec("formatBlock", "<h1>")}
          title="Heading 1"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<h2>")}
          title="Heading 2"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<h3>")}
          title="Heading 3"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Heading3 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<p>")}
          title="Paragraf Biasa"
          className="px-2 py-1 text-xs font-mono rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          P
        </button>

        <span className="w-[1px] h-4 bg-[#4d4635]/40 mx-1"></span>

        {/* Lists */}
        <button
          type="button"
          onClick={() => exec("insertUnorderedList")}
          title="Daftar Bullet"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("insertOrderedList")}
          title="Daftar Bernomor"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-4 bg-[#4d4635]/40 mx-1"></span>

        {/* Block Elements */}
        <button
          type="button"
          onClick={() => exec("formatBlock", "<blockquote>")}
          title="Kutipan (Quote)"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("formatBlock", "<pre>")}
          title="Blok Kode (Code)"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Code className="w-4 h-4" />
        </button>

        <span className="w-[1px] h-4 bg-[#4d4635]/40 mx-1"></span>

        {/* Links & Media */}
        <button
          type="button"
          onClick={handleInsertLink}
          title="Sisipkan Tautan"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Unggah & Sisipkan Gambar"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors flex items-center gap-1"
        >
          <ImageIcon className="w-4 h-4" />
          {isUploading && <span className="text-[10px] animate-pulse">...</span>}
        </button>

        <span className="w-[1px] h-4 bg-[#4d4635]/40 mx-1"></span>

        {/* Undo / Redo & Clear */}
        <button
          type="button"
          onClick={() => exec("undo")}
          title="Undo"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("redo")}
          title="Redo"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <Redo className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => exec("removeFormat")}
          title="Hapus Format"
          className="p-1.5 rounded hover:bg-[#292a2a] hover:text-[#f2ca50] transition-colors"
        >
          <RemoveFormatting className="w-4 h-4" />
        </button>

        {/* Source Mode Toggle */}
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setIsSourceMode(!isSourceMode)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              isSourceMode
                ? "bg-[#f2ca50] text-[#080808] font-bold"
                : "bg-[#292a2a] text-[#d0c5af] hover:text-white"
            }`}
            title="Toggle Mode HTML Mentah"
          >
            {isSourceMode ? (
              <>
                <Eye className="w-3.5 h-3.5" /> Visual
              </>
            ) : (
              <>
                <Code2 className="w-3.5 h-3.5" /> HTML
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {isSourceMode ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ minHeight }}
          className="w-full p-4 bg-[#121414] text-[#e3e2e2] font-mono text-sm focus:outline-none resize-y"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          style={{ minHeight }}
          data-placeholder={placeholder}
          className="p-4 bg-[#121414] text-[#e3e2e2] focus:outline-none prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-[#d0c5af] prose-a:text-[#f2ca50] prose-strong:text-white prose-code:text-[#f2ca50] prose-code:bg-[#1b1c1c] prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-[#1b1c1c] prose-blockquote:border-l-2 prose-blockquote:border-[#f2ca50] prose-blockquote:pl-4 prose-blockquote:italic"
        />
      )}
    </div>
  );
}
