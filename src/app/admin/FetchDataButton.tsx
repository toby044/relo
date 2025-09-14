"use client";

import { useState } from "react";

export default function FetchDataButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function fetchAndAddMovies() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("api/fetchData", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setMessage("Error: " + (json?.error ?? res.statusText));
      } else {
        setMessage("Success: inserted " + (json?.inserted ?? "unknown"));
      }
    } catch (err: any) {
      setMessage("Unexpected error: " + (err?.message ?? String(err)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={fetchAndAddMovies}
        disabled={loading}
        className="px-4 py-2 rounded bg-sky-600 text-white disabled:opacity-50"
      >
        {loading ? "Working..." : "Fetch & Add Movies"}
      </button>

      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
