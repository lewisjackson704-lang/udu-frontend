import React, { useEffect, useState } from "react";
import { Flame, Radio, RefreshCcw } from "lucide-react";
import VideoGrid from "../components/Video/VideoGrid.jsx";
import { fetchTrendingVideos, fetchActiveStreams } from "../api/videos.js";

/**
 * Home.jsx — Main Landing Page
 * Displays trending videos, live content, and word of the day.
 */
export default function Home() {
  const [trending, setTrending] = useState([]);
  const [live, setLive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [word, setWord] = useState({
    term: "Create",
    meaning: "To make something unique — every day.",
  });

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [videosRes, streamsRes] = await Promise.all([
        fetchTrendingVideos(),
        fetchActiveStreams(),
      ]);
      setTrending(videosRes || []);
      setLive(streamsRes || []);
    } catch (err) {
      console.error("Error loading home data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white"
      aria-label="U·DU Home Page"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
        <h1 className="text-xl font-bold text-amber-400" aria-label="U·DU Logo">
          U·DU
        </h1>
        <button
          onClick={loadData}
          className="flex items-center gap-2 rounded-lg border border-amber-400/30 bg-black/40 px-3 py-1.5 text-sm text-white/70 hover:bg-amber-400/10"
          aria-label="Refresh content"
        >
          <RefreshCcw size={14} aria-hidden="true" /> Refresh
        </button>
      </header>

      <main className="p-4 sm:p-6 space-y-10">
        {/* Word of the Day */}
        <section
          className="rounded-2xl border border-amber-400/30 bg-black/60 p-6 text-center shadow-md backdrop-blur-md"
          aria-label="Word of the Day"
        >
          <h2 className="text-amber-400 font-bold text-lg mb-2">Word of the Day</h2>
          <p className="text-3xl font-extrabold text-amber-300 tracking-wide">
            {word.term}
          </p>
          <p className="mt-2 text-sm text-white/70">{word.meaning}</p>
        </section>

        {/* Live Now */}
        {live.length > 0 && (
          <section aria-label="Live Now">
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-400">
                <Radio size={18} aria-hidden="true" /> Live Now
              </h2>
              <a
                href="/live"
                className="text-xs text-white/60 hover:text-amber-300 transition"
                aria-label="View all live streams"
              >
                View All →
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {live.slice(0, 8).map((stream) => (
                <div
                  key={stream._id}
                  className="group relative rounded-xl overflow-hidden border border-white/10 bg-black/40 hover:border-amber-400/30 transition"
                  aria-label={`Live stream: ${stream.title}`}
                >
                  <img
                    src={stream.thumbnail || "/placeholder-thumb.jpg"}
                    alt={stream.title}
                    className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {stream.title}
                    </h3>
                    <p className="text-xs text-white/60">
                      {stream.creatorName || "Live Creator"}
                    </p>
                  </div>
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-500/80 px-2 py-0.5 rounded-full text-xs font-semibold text-white">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse" /> LIVE
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trending Videos */}
        <section aria-label="Trending Videos">
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-amber-400">
              <Flame size={18} aria-hidden="true" /> Trending
            </h2>
            <a
              href="/explore"
              className="text-xs text-white/60 hover:text-amber-300 transition"
              aria-label="Explore more trending videos"
            >
              Explore More →
            </a>
          </div>

          {loading ? (
            <div className="text-center text-white/60 py-8" aria-label="Loading trending videos">
              Loading...
            </div>
          ) : error ? (
            <p className="text-center text-red-400 py-8">{error}</p>
          ) : trending.length > 0 ? (
            <VideoGrid videos={trending} />
          ) : (
            <p className="text-center text-white/60 py-8">
              No trending videos found. Be the first to upload!
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} U·DU — Discover. Create. Live.
      </footer>
    </div>
  );
}
