import React from "react";
import PropTypes from "prop-types";
import { CalendarClock } from "lucide-react";

/**
 * Small upcoming streams list.
 * - items: [{ id, title, when (Date|string), host, thumbnail }]
 * - onRemind(id): optional callback for "Remind me"
 */
export default function LiveSchedule({
  items = [],
  onRemind,
  className = "",
}) {
  // Sanitize date and time strings to prevent invalid or unsafe input
  const formatDateTime = (date) => {
    try {
      const parsedDate = new Date(date);
      return parsedDate.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (error) {
      console.error("Invalid date provided:", date);
      return "Invalid date";
    }
  };

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-black/35 p-4 text-white backdrop-blur-md ${className}`}
      role="region"
      aria-label="Upcoming Live Streams"
    >
      <header className="mb-3 flex items-center gap-2">
        <CalendarClock size={18} className="text-amber-300" aria-hidden="true" />
        <h3 className="text-sm font-semibold">Upcoming Live</h3>
      </header>

      {/* If no streams are available */}
      {items.length === 0 ? (
        <div
          className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
          role="status"
        >
          No scheduled streams yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2"
            >
              {/* Thumbnail */}
              <img
                src={it.thumbnail || "/logo512.png"}
                alt={it.title || "Stream thumbnail"}
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
                loading="lazy"
                onError={(e) => {
                  console.error(
                    `Thumbnail failed to load for item ID ${it.id}. Falling back to default.`
                  );
                  e.target.src = "/logo512.png"; // Fallback thumbnail
                }}
              />

              {/* Stream Details */}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">
                  {it.title || "Untitled Stream"}
                </div>
                <div className="text-[12px] text-white/70">
                  {it.host ? `with ${it.host} • ` : ""}
                  {formatDateTime(it.when)}
                </div>
              </div>

              {/* Remind Me Button */}
              <button
                onClick={() => {
                  try {
                    onRemind?.(it.id);
                  } catch (error) {
                    console.error(
                      `Failed to set reminder for item ID ${it.id}:`,
                      error
                    );
                  }
                }}
                className="rounded-lg border border-amber-300/40 bg-black/40 px-2.5 py-1.5 text-xs font-semibold text-amber-300 hover:border-amber-300"
                aria-label={`Remind me about "${it.title || "this stream"}"`}
              >
                Remind me
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

LiveSchedule.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      when: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
      host: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ),
  onRemind: PropTypes.func,
  className: PropTypes.string,
};
