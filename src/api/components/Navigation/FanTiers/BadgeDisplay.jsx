import React from "react";
import PropTypes from "prop-types";
import { Crown, Star, Zap } from "lucide-react";

/**
 * BadgeDisplay — shows fan tier badges (used in chat or profiles).
 * Displays a badge icon and tier name with adaptive styling.
 */
export default function BadgeDisplay({ tier }) {
  if (!tier) return null;

  const badgeMap = {
    Gold: <Crown className="text-amber-400" size={18} aria-hidden="true" />,
    Rose: <Star className="text-rose-400" size={18} aria-hidden="true" />,
    Sky: <Zap className="text-sky-400" size={18} aria-hidden="true" />,
  };

  return (
    <div
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2 py-1 text-xs text-white backdrop-blur-md"
      role="status"
      aria-label={`Fan tier badge: ${tier}`}
    >
      {badgeMap[tier] || badgeMap.Gold}
      <span className="font-semibold text-amber-300">{tier}</span>
    </div>
  );
}

BadgeDisplay.propTypes = {
  tier: PropTypes.oneOf(["Gold", "Rose", "Sky"]).isRequired,
};
