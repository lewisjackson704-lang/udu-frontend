import React, { useEffect, useState } from "react";
import { Edit, Trash2, Eye, Loader2, PlayCircle } from "lucide-react";

/**
 * VideoManager — Creator’s upload management dashboard.
 * Displays uploaded videos with options to view, edit, or delete.
 */
export default function VideoManager() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch creator’s videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos/creator`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch videos.");
        const data = await res.json();
        setVideos(data.videos || []);
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete the video.");
      setVideos((prevVideos) => prevVideos.filter((v) => v._id !== id));
    } catch (err) {
      alert(err.message || "An error occurred while deleting the video.");
    }
  };

  return (
    <div
      className="rounded-2xl border border-amber-400/30 bg-black/60 p-6 text-white shadow-xl backdrop-blur-md"
      aria-label="Uploaded videos management panel"
    >
      <h3 className="mb-4 flex items-center justify-between text-xl font-bold text-amber-400">
        My Uploads
        <span className="text-sm text-white/60" aria-live="polite">
          {videos.length} {videos.length === 1 ? "Video" : "Videos"}
        </span>
      </h3>

      {/* Loading State */}
      {loading && (
        <div
          className="flex justify-center py-10"
          role="status"
          aria-label="Loading videos"
        >
          <Loader2 size={24} className="animate-spin text-amber-400" />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center text-red-400" role="alert">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && videos.length === 0 && (
        <div
          className="py-10 text-center text-white/60"
          aria-label="No videos uploaded yet"
        >
          No videos uploaded yet. <br />
          <span className="text-amber-400">Click “Upload New Video”</span> to get started.
        </div>
      )}

      {/* Videos Table */}
      {!loading && !error && videos.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full text-sm" aria-label="Uploaded videos table">
            <thead className="bg-black/40 border-b border-white/10">
              <tr className="text-left text-white/60">
                <th className="px-4 py-2">Thumbnail</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Views</th>
                <th className="px-4 py-2">Uploaded</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr
                  key={video._id}
                  className="border-b border-white/10 hover:bg-amber-400/10 transition"
                >
                  <td className="px-4 py-2">
                    <img
                      src={video.thumbnail || "/placeholder-thumb.jpg"}
                      alt={`${video.title || "Video"} thumbnail`}
                      className="h-16 w-28 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-white">{video.title}</td>
                  <td className="px-4 py-2 text-white/70">{video.category || "N/A"}</td>
                  <td className="px-4 py-2 text-white/70">{video.views || 0}</td>
                  <td className="px-4 py-2 text-white/50">
                    {new Date(video.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-2 hover:bg-amber-400/20"
                      title="View Video"
                      onClick={() => window.open(`/watch/${video._id}`, "_blank")}
                      aria-label={`View video: ${video.title}`}
                    >
                      <Eye size={16} className="text-amber-400" />
                    </button>
                    <button
                      className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-2 hover:bg-amber-400/20"
                      title="Edit"
                      onClick={() => alert("Edit functionality coming soon!")}
                      aria-label={`Edit video: ${video.title}`}
                    >
                      <Edit size={16} className="text-amber-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(video._id)}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 hover:bg-red-500/20"
                      title="Delete"
                      aria-label={`Delete video: ${video.title}`}
                    >
                      <Trash2 size={16} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
