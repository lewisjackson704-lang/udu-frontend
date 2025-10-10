import React, { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * ModalWrapper — glassy overlay + centered card
 * - Close on ESC or backdrop click
 * - Keeps background interactive video playing (no pointer lock)
 */
export default function ModalWrapper({ open, onClose, children, width = "max-w-lg" }) {
  useEffect(() => {
    const onKey = (e) => {
      try {
        if (e.key === "Escape") onClose?.();
      } catch (error) {
        console.error("Error handling ESC key event:", error);
      }
    };

    if (open) {
      document.addEventListener("keydown", onKey);
    }

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
        role="presentation"
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className={`w-full ${width} rounded-2xl border border-white/15 bg-black/60 p-4 text-white shadow-2xl backdrop-blur-xl`}
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

ModalWrapper.propTypes = {
  open: PropTypes.bool.isRequired, // Controls the visibility of the modal
  onClose: PropTypes.func,         // Callback for closing the modal
  children: PropTypes.node,        // Content of the modal
  width: PropTypes.string,         // Tailwind width modifier (e.g., "max-w-lg", "max-w-sm")
};
