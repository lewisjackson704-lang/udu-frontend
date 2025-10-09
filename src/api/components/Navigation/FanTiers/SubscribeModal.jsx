import React from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";

/**
 * SubscribeModal — modal for confirming a subscription.
 * Displays tier details and a confirm subscription button.
 */
export default function SubscribeModal({ open, onClose, tier }) {
  // Prevent rendering if the modal is closed or tier data is missing
  if (!open || !tier) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="subscribe-modal-title"
      aria-describedby="subscribe-modal-description"
    >
      <div className="w-[90%] max-w-md rounded-2xl border border-white/10 bg-white/80 p-6 text-black shadow-xl dark:bg-black/40 dark:text-white">
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between">
          <h3
            id="subscribe-modal-title"
            className="text-lg font-semibold text-amber-500 dark:text-amber-400"
          >
            Subscribe to {tier.name}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full bg-white/20 p-1 hover:bg-white/30 dark:bg-black/30"
            aria-label="Close subscription modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Description */}
        <p
          id="subscribe-modal-description"
          className="mb-4 text-sm text-black/80 dark:text-white/70"
        >
          Support your favorite creator and unlock exclusive perks:
        </p>

        {/* Perks List */}
        <ul className="mb-5 space-y-1 text-sm">
          {tier.perks && tier.perks.length > 0 ? (
            tier.perks.map((perk, i) => (
              <li key={i}>• {perk}</li>
            ))
          ) : (
            <li>No perks available</li>
          )}
        </ul>

        {/* Confirm Subscription Button */}
        <button
          onClick={() => {
            try {
              alert(`Subscribed to ${tier.name}!`);
              onClose();
            } catch (error) {
              console.error("Error during subscription:", error);
            }
          }}
          className="w-full rounded-xl border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
          aria-label={`Confirm subscription to ${tier.name} for $${tier.price}/month`}
        >
          Confirm Subscription (${tier.price}/month)
        </button>
      </div>
    </div>
  );
}

// PropTypes for validation
SubscribeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tier: PropTypes.shape({
    name: PropTypes.string.isRequired,
    perks: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
  }),
};
