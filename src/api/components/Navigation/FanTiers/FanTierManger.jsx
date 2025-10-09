import React, { useState } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";

/**
 * FanTierManager — creator-side management dashboard for fan tiers.
 * Adaptive amber theme, minimal layout.
 */
export default function FanTierManager() {
  const [tiers, setTiers] = useState([
    { id: 1, name: "Gold Tier", price: 5, perks: ["Exclusive videos", "Early access"] },
    { id: 2, name: "Diamond Tier", price: 15, perks: ["Private Q&A", "Live shoutouts"] },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [newTier, setNewTier] = useState({ name: "", price: "", perks: "" });

  // Adds a new tier with validation
  const addTier = () => {
    if (!newTier.name.trim() || !newTier.price || isNaN(newTier.price)) {
      alert("Please provide a valid name and price for the new tier.");
      return;
    }

    setTiers([
      ...tiers,
      {
        id: Date.now(),
        name: newTier.name.trim(),
        price: parseFloat(newTier.price),
        perks: newTier.perks ? newTier.perks.split(",").map((p) => p.trim()) : [],
      },
    ]);

    setNewTier({ name: "", price: "", perks: "" });
  };

  // Deletes a tier
  const deleteTier = (id) => {
    if (window.confirm("Are you sure you want to delete this tier?")) {
      setTiers(tiers.filter((t) => t.id !== id));
    }
  };

  // Updates a specific key in the tier being edited
  const updateTier = (id, key, value) => {
    setTiers(
      tiers.map((t) => (t.id === id ? { ...t, [key]: value } : t))
    );
  };

  // Toggles the edit mode for a tier
  const toggleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  return (
    <div
      className="rounded-2xl border border-black/10 bg-white/70 p-6 text-black shadow-md transition-colors duration-300 dark:border-white/10 dark:bg-black/30 dark:text-white"
      role="region"
      aria-label="Fan Tier Management Dashboard"
    >
      <h3 className="mb-4 text-lg font-semibold text-amber-500 dark:text-amber-400">
        Manage Fan Tiers
      </h3>

      {/* Existing Tiers */}
      <div className="space-y-3">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/40 p-3 dark:bg-black/40 sm:flex-row sm:items-center sm:justify-between"
            role="region"
            aria-label={`Tier: ${tier.name}`}
          >
            <div className="flex flex-col gap-1 sm:w-1/3">
              {editingId === tier.id ? (
                <input
                  value={tier.name}
                  onChange={(e) => updateTier(tier.id, "name", e.target.value)}
                  className="rounded-lg border border-amber-300 bg-transparent px-2 py-1 text-sm text-black dark:text-white"
                  aria-label={`Edit name for tier ${tier.name}`}
                />
              ) : (
                <span className="font-semibold text-amber-500 dark:text-amber-400">
                  {tier.name}
                </span>
              )}
              {editingId === tier.id ? (
                <input
                  type="number"
                  value={tier.price}
                  onChange={(e) => updateTier(tier.id, "price", e.target.value)}
                  className="rounded-lg border border-amber-300 bg-transparent px-2 py-1 text-sm text-black dark:text-white"
                  aria-label={`Edit price for tier ${tier.name}`}
                />
              ) : (
                <span className="text-sm text-black/70 dark:text-white/70">
                  ${tier.price}/month
                </span>
              )}
            </div>

            <div className="sm:w-1/2">
              {editingId === tier.id ? (
                <textarea
                  rows={2}
                  value={tier.perks.join(", ")}
                  onChange={(e) =>
                    updateTier(tier.id, "perks", e.target.value.split(",").map((p) => p.trim()))
                  }
                  className="w-full rounded-lg border border-amber-300 bg-transparent px-2 py-1 text-sm text-black dark:text-white"
                  aria-label={`Edit perks for tier ${tier.name}`}
                />
              ) : (
                <ul className="list-disc pl-5 text-sm text-black/80 dark:text-white/70">
                  {tier.perks.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center gap-2 sm:w-auto">
              {editingId === tier.id ? (
                <button
                  onClick={() => toggleEdit(tier.id)}
                  className="rounded-lg border border-amber-400 bg-amber-400/10 p-2 text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                  aria-label={`Save changes for tier ${tier.name}`}
                >
                  <Save size={16} />
                </button>
              ) : (
                <button
                  onClick={() => toggleEdit(tier.id)}
                  className="rounded-lg border border-amber-400 bg-amber-400/10 p-2 text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
                  aria-label={`Edit tier ${tier.name}`}
                >
                  <Edit2 size={16} />
                </button>
              )}
              <button
                onClick={() => deleteTier(tier.id)}
                className="rounded-lg border border-rose-400 bg-rose-400/10 p-2 text-rose-500 hover:bg-rose-400/20"
                aria-label={`Delete tier ${tier.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="my-5 border-white/10" />

      {/* Add New Tier */}
      <div
        className="rounded-xl border border-white/10 bg-white/40 p-4 dark:bg-black/40"
        role="region"
        aria-label="Add New Tier"
      >
        <h4 className="mb-2 text-sm font-semibold text-amber-500 dark:text-amber-400">
          Add New Tier
        </h4>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Tier Name"
            value={newTier.name}
            onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
            className="flex-1 rounded-lg border border-amber-300 bg-transparent px-3 py-2 text-sm text-black dark:text-white"
            aria-label="New tier name"
          />
          <input
            type="number"
            placeholder="Price ($)"
            value={newTier.price}
            onChange={(e) => setNewTier({ ...newTier, price: e.target.value })}
            className="w-28 rounded-lg border border-amber-300 bg-transparent px-3 py-2 text-sm text-black dark:text-white"
            aria-label="New tier price"
          />
          <input
            type="text"
            placeholder="Perks (comma separated)"
            value={newTier.perks}
            onChange={(e) => setNewTier({ ...newTier, perks: e.target.value })}
            className="flex-1 rounded-lg border border-amber-300 bg-transparent px-3 py-2 text-sm text-black dark:text-white"
            aria-label="New tier perks"
          />
          <button
            onClick={addTier}
            className="flex items-center justify-center gap-2 rounded-xl border border-amber-400 bg-amber-400/10 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-400/20 dark:text-amber-300"
            aria-label="Add new tier"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
