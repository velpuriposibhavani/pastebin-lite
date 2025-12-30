"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/pastes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? parseInt(ttl) : undefined,
        max_views: views ? parseInt(views) : undefined,
      }),
    });
    const data = await res.json();
    if (res.ok) setUrl(data.url);
    else alert("Error: " + JSON.stringify(data));
  };

  return (
    <main className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">Pastebin-Lite</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-3 border rounded h-40 font-mono"
          placeholder="Enter your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex gap-4">
          <input
            type="number"
            className="p-2 border rounded w-1/2"
            placeholder="TTL (seconds) - optional"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
          <input
            type="number"
            className="p-2 border rounded w-1/2"
            placeholder="Max Views - optional"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Create Paste
        </button>
      </form>

      {url && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800">Paste created! Share this link:</p>
          <a href={url} className="text-blue-600 underline break-all">{url}</a>
        </div>
      )}
    </main>
  );
}