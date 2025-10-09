import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search, X } from "lucide-react";

/**
 * SearchBar — global search input for creators, videos, or fans.
 * - Amber accent, glass background
 * - Adaptive (light/dark)
 */
export default function SearchBar({ placeholder = "Search U·DU...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (!query.trim()) return;
      onSearch?.(query.trim());
    } catch (error) {
      console.error("Error handling search submission:", error);
    }
  };

  const clearSearch = () => {
    try {
      setQuery("");
    } catch (error) {
      console.error("Error clearing search input:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full items-center rounded-2xl border border-black/10 bg-white/70 px-4 py-2 shadow-sm transition-colors duration-300 dark:border-white/10 dark:bg-black/30"
      role="search"
      aria-label="Global search bar"
    >
      <Search
        size={18}
        className="mr-2 text-amber-400"
        aria-hidden="true"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-black placeholder:text-black/60 focus:outline-none dark:text-white dark:placeholder:text-white/60"
        aria-label="Search input"
      />
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="ml-2 rounded-full p-1 text-black/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/10"
          aria-label="Clear search"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
};
