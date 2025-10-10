import React, { useEffect, useState } from "react";
import { Coins, Users, Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { fetchFanTiers, createFanTier, deleteFanTier } from "../api/fans.js";

/**
 * FanTiers.jsx — Creator monetization control panel
 * Lets creators manage membership tiers, perks, and supporter stats.
 */
export default function FanTiers() {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTier, setNewTier] = useState({ name: "", price: "", perks: "" });

  // Fetch tiers
  const loadTiers = async () => {
    try {
      setLoading(true);
      const data = await fetchFanTiers();
      setTiers(data || []);
    } catch (err) {
      console.error("Error loading tiers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create new tier
  const handleCreate = async () => {
    if (!newTier.name || !newTier.price) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      await createFanTier(newTier);
      setNewTier({ name: "", price: "", perks: "" });
      setShowForm(false);
      await loadTiers();
    } catch (err) {
      alert("Error creating tier. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a tier
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tier?")) return;

    try {
      await deleteFanTier(id);
      setTiers((prevTiers) => prevTiers.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete tier. Please try again.");
    }
  };

  useEffect(() => {
    loadTiers();
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white p-6"
      aria-label="Fan tiers management panel"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <h1
          className="text-2xl font-bold text-amber-400 flex items-center gap-2"
          aria-label="Monetization Dashboard"
        >
          <Coins size={22} aria-hidden="true" /> Monetization Dashboard
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-3 py-1.5 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
          aria-label="Add a new tier"
        >
          <Plus size={14} aria-hidden="true" /> Add Tier
        </button>
      </header>

      {/* Add New Tier Form */}
      {showForm && (
        <div
          className="mb-8 rounded-xl border border-amber-400/30 bg-black/60 p-6 shadow-md backdrop-blur-md"
          aria-label="New tier form"
        >
          <h2 className="text-lg font-semibold text-amber-300 mb-3">New Tier</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Tier name (e.g., Gold, VIP)"
              value={newTier.name}
              onChange={(e) =>
                setNewTier((prev) => ({ ...prev, name: e.target.value }))
              }
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-amber-400 outline-none"
              aria-label="Tier name"
            />
            <input
              type="number"
              placeholder="Price (USD)"
              value={newTier.price}
              onChange={(e) =>
                setNewTier((prev) => ({ ...prev, price: e.target.value }))
              }
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-amber-400 outline-none"
              aria-label="Tier price"
            />
            <input
              type="text"
              placeholder="Perks (comma-separated)"
              value={newTier.perks}
              onChange={(e) =>
                setNewTier((prev) => ({ ...prev, perks: e.target.value }))
              }
              className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-amber-400 outline-none"
              aria-label="Tier perks"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/20"
              aria-label="Save new tier"
            >
              Save Tier
            </button>
          </div>
        </div>
      )}

      {/* Supporter Stats */}
      <div
        className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
        aria-label="Supporter statistics"
      >
        {[
          { label: "Total Supporters", value: "248", icon: Users },
          { label: "Monthly Revenue", value: "$1,320", icon: Coins },
          { label: "Active Tiers", value: tiers.length, icon: Plus },
          { label: "Avg. Pledge", value: "$5.32", icon: Coins },
        ].map((stat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center rounded-xl border border-amber-400/30 bg-black/40 p-4 text-center text-white shadow-md backdrop-blur-md"
            aria-label={stat.label}
          >
            <stat.icon size={22} className="text-amber-400 mb-1" aria-hidden="true" />
            <div className="text-lg font-semibold">{stat.value}</div>
            <div className="text-xs text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Existing Tiers */}
      <section aria-label="Existing tiers">
        <h2 className="text-lg font-semibold text-amber-400 mb-4">Your Tiers</h2>
        {loading ? (
          <div
            className="flex justify-center py-10"
            role="status"
            aria-label="Loading tiers"
          >
            <Loader2 size={24} className="animate-spin text-amber-400" />
          </div>
        ) : tiers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier._id}
                className="rounded-xl border border-amber-400/30 bg-black/60 p-5 shadow-lg hover:bg-black/70 transition backdrop-blur-md"
                aria-label={`Tier: ${tier.name}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-amber-300">{tier.name}</h3>
                  <div className="flex gap-2">
                    <button
                      className="text-white/60 hover:text-amber-300"
                      title="Edit tier (coming soon)"
                      aria-label="Edit tier"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(tier._id)}
                      className="text-red-400 hover:text-red-300"
                      title="Delete tier"
                      aria-label={`Delete tier: ${tier.name}`}
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-2">${tier.price}/month</p>
                <ul className="text-xs text-white/60 space-y-1 mb-3">
                  {(tier.perks || "")
                    .split(",")
                    .map((perk, i) => (
                      <li key={i}>• {perk.trim()}</li>
                    ))}
                </ul>
                <button
                  className="w-full rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-sm text-amber-300 hover:bg-amber-400/20"
                  aria-label={`View supporters for ${tier.name}`}
                >
                  View Supporters
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/60 py-10">
            You haven’t created any tiers yet.
          </div>
        )}
      </section>
    </div>
  );
}
