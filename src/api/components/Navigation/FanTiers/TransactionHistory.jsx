import React, { useEffect, useState } from "react";
import {
  Loader2,
  DollarSign,
  Calendar,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import { fetchTransactionHistory } from "../../api/fans.js";

/**
 * TransactionHistory.jsx
 * Displays a list of completed and pending supporter payments for creators and fans.
 */
export default function TransactionHistory({ mode = "creator" }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load transactions on component mount or when `mode` changes
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactionHistory(mode);
        setTransactions(data || []);
      } catch (err) {
        console.error("Failed to load transactions:", err);
        setError("Could not load transaction history.");
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [mode]);

  // Loading state
  if (loading) {
    return (
      <div
        className="flex justify-center py-10 text-amber-400"
        role="status"
        aria-label="Loading transaction history"
      >
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="text-center text-red-400 py-10"
        role="alert"
        aria-label="Error loading transaction history"
      >
        {error}
      </div>
    );
  }

  // Empty state
  if (!transactions.length) {
    return (
      <div
        className="text-center text-white/60 py-10"
        role="status"
        aria-label="No transactions found"
      >
        No transactions yet.
      </div>
    );
  }

  // Main render
  return (
    <div
      className="rounded-xl border border-amber-400/20 bg-black/60 p-5 backdrop-blur-md shadow-lg"
      aria-label="Transaction history table"
    >
      <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
        <DollarSign size={18} aria-hidden="true" /> Transaction History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="text-white/70 border-b border-white/10">
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3">User / Creator</th>
              <th className="py-2 px-3">Tier</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="border-b border-white/5 hover:bg-white/5 transition"
                role="row"
                aria-label={`Transaction on ${new Date(tx.date).toLocaleDateString()}`}
              >
                <td className="py-2 px-3 text-white/80 flex items-center gap-2">
                  <Calendar size={14} className="text-amber-400" aria-hidden="true" />
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-3 text-white/70">
                  {mode === "creator" ? tx.fanName : tx.creatorName}
                </td>
                <td className="py-2 px-3 text-white/70">{tx.tierName}</td>
                <td className="py-2 px-3 text-amber-300">${tx.amount.toFixed(2)}</td>
                <td className="py-2 px-3">
                  {tx.status === "completed" ? (
                    <span
                      className="flex items-center gap-1 text-green-400"
                      role="status"
                      aria-label="Completed payment"
                    >
                      <ArrowUpRight size={14} aria-hidden="true" /> Paid
                    </span>
                  ) : tx.status === "pending" ? (
                    <span
                      className="flex items-center gap-1 text-yellow-400"
                      role="status"
                      aria-label="Pending payment"
                    >
                      <ArrowDownRight size={14} aria-hidden="true" /> Pending
                    </span>
                  ) : (
                    <span
                      className="text-red-400"
                      role="status"
                      aria-label="Failed payment"
                    >
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
