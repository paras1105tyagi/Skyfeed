import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../api/client";

const TweetComposer = ({ onCreated }) => {
  const { isAuthenticated } = useAuth();
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!content.trim() && !file) return;
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("content", content);
      if (file) form.append("image", file);
      await apiClient.post("/tweets", form, { headers: { "Content-Type": "multipart/form-data" } });
      setContent("");
      setFile(null);
      onCreated && onCreated();
    } catch (e) {
      setError("Failed to post tweet");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <form onSubmit={submit} className="mb-4 p-4 border rounded space-y-3 bg-white">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        className="w-full border rounded px-3 py-2 min-h-20"
      />
      <div className="flex items-center justify-between">
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default TweetComposer;


