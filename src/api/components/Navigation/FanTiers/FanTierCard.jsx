import React from "react";
import PropTypes from "prop-types";
import { Crown, Star, Zap } from "lucide-react";

/**
 * FanTierCard — displays a creator's subscription tier.
 * Adaptive amber styling with accent icons.
 */
export default function FanTierCard({
  name,
  price,
  perks = [],
  color = "amber",
  onSubscribe,
}) {
  const iconMap = {
    amber: <Crown className="text-amber-400" size={22} aria-hidden="true" />,
    rose: <Star className="text-rose-400" size={22} aria-hidden="true" />,
    blue: <Zap className="text-sky-400" size={22} aria-hidden="true" />,
  };

  // Handle subscription logic with error prevention
  const handleSubscribe = () => {
    try {
      onSubscribe?.();
    } catch (error) {
      console.error("Error during subscription:", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-between rounded-2xl border border-black/10 bg-white/70 p-5 text-black shadow-md transition hover:scale-[1.02] hover:shadow-lg dark:border-white/10 dark:bg-black/30 dark:text-white"
      role="region"
      aria-label={`Subscription tier: ${name}`}
    >
      {/* Tier Name & Icon */}
      <div className="mb-2 flex items-center gap-2 text-lg font-bold text-amber-500 dark:text-amber-400">
        {iconMap[color] || iconMap.amber}
        <span>{name}</span>
      </div>

      {/* Price */}
      <div className="mb-3 text-sm text-black/70 dark:text-white/70">
        ${price}/month
      </div>

      {/* Perks List */}
      <ul
        className="mb-4 space-y-1 text-sm text-center text-black/80 dark:text-white/70"
        aria-label={`Perks included in the ${name} tier`}
      >
        {perks.length > 0 ? (
          perks.map((perk, i) => <li key={i}>• {perk}</li>)
        ) : (
          <li>No perks available</li>
        )}
      </ul>

      {/* Subscribe Button */}
      <button
        onClick={handleSubscribe}
        className="w-full rounded-xl border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-600 transition hover:bg-amber-400/20 dark:text-amber-300"
        aria-label={`Subscribe to ${name} tier for $${price}/month`}
      >
        Subscribe
      </button>
    </div>
  );
}

FanTierCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  perks: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.oneOf(["amber", "rose", "blue"]),
  onSubscribe: PropTypes.func,
};
