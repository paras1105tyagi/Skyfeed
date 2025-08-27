import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";
import { useAuth } from "../context/AuthContext";
import TweetComposer from "../shared/TweetComposer";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();

  const loadTweets = async () => {
    try {
      const res = await apiClient.get("/tweets");
      setTweets(res?.data?.data || []);
    } catch (e) {
      setError("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  const toggleLike = async (tweet) => {
    if (!isAuthenticated) return;
    const modelId = tweet._id || tweet.id;
    try {
      await apiClient.post(`/likes/toggle?modelId=${modelId}&modelType=Tweet`, { userId: user.id });
      await loadTweets();
    } catch (e) {}
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4">
      <TweetComposer onCreated={loadTweets} />
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {tweets.map((t) => (
          <li key={t._id || t.id} className="py-4">
            <Link to={`/tweets/${t._id || t.id}`} className="block">
              <p className="whitespace-pre-wrap">{t.content}</p>
              {t.image && (
                <img src={t.image} alt="tweet" className="mt-2 rounded border" />
              )}
            </Link>
            <div className="mt-2 flex items-center gap-3">
              <button onClick={() => toggleLike(t)} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">Like</button>
              <span className="text-sm text-gray-600">{t.likes?.length || 0} likes</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;


