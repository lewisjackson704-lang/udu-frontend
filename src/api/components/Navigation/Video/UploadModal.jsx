import React, { useState, useRef } from "react";
import { X, Upload, FileVideo, Loader2 } from "lucide-react";

/**
 * UploadModal — Creator upload interface
 * Supports drag/drop, title, description, and category input
 * Adaptive, glassy U·DU design
 */
export default function UploadModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const video = e.dataTransfer.files[0];
    if (video && video.type.startsWith("video/")) {
      setFile(video);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleFileSelect = (e) => {
    const video = e.target.files[0];
    if (video && video.type.startsWith("video/")) {
      setFile(video);
    } else {
      alert("Please upload a valid video file.");
    }
  };

  const handleUpload = async () => {
    if (!file || !title.trim()) {
      return alert("Please add a video and title.");
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("video", file);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      alert("Upload successful!");
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[95%] max-w-lg rounded-2xl border border-amber-400/40 bg-black/70 p-6 text-white shadow-2xl backdrop-blur-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2
            id="upload-modal-title"
            className="text-xl font-bold text-amber-400"
          >
            Upload New Video
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white/60 hover:text-white"
            aria-label="Close upload modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dropzone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current.click()}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition ${
            file
              ? "border-amber-400 bg-black/30"
              : "border-white/20 hover:border-amber-400/60 bg-black/40"
          }`}
          aria-label="Video upload dropzone"
        >
          {file ? (
            <>
              <FileVideo size={40} className="text-amber-400 mb-2" />
              <p className="text-sm text-white/80">{file.name}</p>
              <p className="text-xs text-white/50 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </>
          ) : (
            <>
              <Upload size={40} className="text-amber-400 mb-2" />
              <p className="text-sm text-white/70">
                Drag & Drop your video here or click to browse
              </p>
            </>
          )}
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            accept="video/*"
            onChange={handleFileSelect}
          />
        </div>

        {/* Metadata */}
        <div className="mt-4 space-y-3">
          <div>
            <label className="block text-xs text-white/60 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              rows={3}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-amber-400"
            >
              <option value="">Select Category</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="vlog">Vlog</option>
              <option value="tutorial">Tutorial</option>
              <option value="comedy">Comedy</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            disabled={uploading}
            onClick={handleUpload}
            className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20 disabled:opacity-60"
            aria-disabled={uploading}
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
