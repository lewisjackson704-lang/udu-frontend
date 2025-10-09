import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";
import { uploadVideo } from "@/api/videos";

export default function UploadModal({ open, onClose, onUploaded }) {
  const fileRef = useRef(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("video/")) {
        setError("Please select a valid video file.");
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) { // 50 MB limit
        setError("File size should not exceed 50 MB.");
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please choose a video file.");
      return;
    }
    setError("");
    setBusy(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("title", title || file.name);
      formData.append("video", file);
      if (thumb) formData.append("thumbnail", thumb);

      const data = await uploadVideo(formData, (p) => setProgress(p));
      setProgress(100);
      setBusy(false);
      onUploaded(data);
      onClose();
      setTitle(""); setFile(null); setThumb(null); setProgress(0);
    } catch (err) {
      setBusy(false);
      setError(err?.response?.data?.message || "Upload failed.");
    }
  };

  const handleClose = () => {
    if (busy && !window.confirm("Upload in progress. Are you sure you want to cancel?")) {
      return;
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center"
          role="dialog"
          aria-labelledby="upload-modal-title"
          aria-describedby="upload-modal-description"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <motion.form
            onSubmit={handleSubmit}
            className="relative w-[92%] max-w-xl rounded-2xl border border-white/10 bg-zinc-900/70 p-5 text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-3 rounded-full p-1 hover:bg-white/10"
              aria-label="Close upload modal"
            >
              <X size={20} />
            </button>
            <h3 id="upload-modal-title" className="mb-4 text-lg font-bold">Upload Video</h3>
            {/* Rest of your component */}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

UploadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUploaded: PropTypes.func.isRequired,
};
