"use client";

import { useState } from "react";

export default function FetchDataButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchAndAddPotterData() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("api/fetchData", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setMessage(`Error: ${json?.error ?? res.statusText}`);
      } else {
        const details = json?.details;
        setMessage(
          `Success: inserted ${json?.inserted ?? "unknown"} items total` +
            (details
              ? ` (${details.spells} spells, ${details.characters} characters, ${details.books} books, ${details.houses} houses)`
              : ""),
        );
      }
    } catch (err: unknown) {
      const error = err as Error;
      setMessage(`Unexpected error: ${error?.message ?? String(error)}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={fetchAndAddPotterData}
        disabled={loading}
        className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50"
      >
        {loading ? "Working..." : "Fetch & Add Potter Data"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
