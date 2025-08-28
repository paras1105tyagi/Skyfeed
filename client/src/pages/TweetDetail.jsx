import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import { useAuth } from "../context/AuthContext";
import ImageLoader from "../components/ImageLoader";

const TweetDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [tweet, setTweet] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTweet = async () => {
    setError("");
    try {
      const res = await apiClient.get(`/tweets/${id}`);
      setTweet(res?.data?.data || null);
    } catch (e) {
      setError("Failed to load tweet");
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (!isAuthenticated || !tweet) return;
    try {
      const modelId = tweet._id || tweet.id;
      await apiClient.post(`/likes/toggle?modelId=${modelId}&modelType=Tweet`, { userId: user.id });
      await loadTweet();
    } catch (e) {}
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !tweet || !comment.trim()) return;
    try {
      const modelId = tweet._id || tweet.id;
      await apiClient.post(`/comments?modelId=${modelId}&modelType=Tweet`, { content: comment });
      setComment("");
      await loadTweet();
    } catch (e) {}
  };

  const toggleCommentLike = async (commentId) => {
    if (!isAuthenticated) return;
    try {
      await apiClient.post(`/likes/toggle?modelId=${commentId}&modelType=Comment`, { userId: user.id });
      await loadTweet();
    } catch (e) {}
  };

  useEffect(() => {
    loadTweet();
  }, [id]);

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-6">Loading...</div>;
  if (error) return <div className="max-w-2xl mx-auto px-4 py-6 text-red-600">{error}</div>;
  if (!tweet) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
             <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md">
         <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">{tweet.content}</p>
         {tweet.image && <ImageLoader src={tweet.image} alt="tweet" className="mt-3 w-full max-h-96 object-cover rounded-lg" />}
         <div className="mt-3 flex items-center gap-3">
          <button onClick={toggleLike} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Like</button>
          <span className="text-sm text-gray-600 dark:text-gray-300">{tweet.likes?.length || 0} likes</span>
        </div>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Comments</h2>
        <ul className="space-y-3">
          {(tweet.comments || []).map((c) => (
            <li key={c._id || c.id} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border-l-4 border-blue-200">
              <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-100">{c.content}</p>
              <div className="mt-2 flex items-center gap-3">
                <button onClick={() => toggleCommentLike(c._id || c.id)} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Like</button>
                <span className="text-sm text-gray-600 dark:text-gray-300">{c.likes?.length || 0} likes</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isAuthenticated && (
        <form onSubmit={addComment} className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            className="flex-1 border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Comment</button>
        </form>
      )}
    </div>
  );
};

export default TweetDetail;


