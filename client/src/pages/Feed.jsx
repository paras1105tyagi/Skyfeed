import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../api/client";
import { useAuth } from "../context/AuthContext";
import TweetComposer from "../shared/TweetComposer";
import ImageLoader from "../components/ImageLoader";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();
  const [whoToFollow, setWhoToFollow] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersOffset, setUsersOffset] = useState(0);
  const USERS_LIMIT = 5;

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
    loadUsers(0);
  }, []);

  const loadUsers = async (offset) => {
    if (!isAuthenticated) return; // endpoint requires auth
    setUsersLoading(true);
    try {
      const res = await apiClient.get(`/users`, { params: { offset, limit: USERS_LIMIT } });
      const list = res?.data?.data || [];
      if (offset === 0) setWhoToFollow(list);
      else setWhoToFollow((prev) => [...prev, ...list]);
      setUsersOffset(offset + USERS_LIMIT);
    } catch (e) {
      // ignore
    } finally {
      setUsersLoading(false);
    }
  };

  const toggleLike = async (tweet) => {
    if (!isAuthenticated) return;
    const modelId = tweet._id || tweet.id;
    try {
      await apiClient.post(`/likes/toggle?modelId=${modelId}&modelType=Tweet`, { userId: user.id });
      await loadTweets();
    } catch (e) {}
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <TweetComposer onCreated={loadTweets} />
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12">
            {tweets.map((t) => (
              <div key={t._id || t.id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.01] transition">
                                 <Link to={`/tweets/${t._id || t.id}`} className="block">
                   <p className="whitespace-pre-wrap text-xl leading-relaxed text-gray-800 dark:text-gray-100">{t.content}</p>
                   {t.image && (
                     <ImageLoader src={t.image} alt="tweet" className="mt-4 w-full max-h-[28rem] object-cover rounded-xl" />
                   )}
                 </Link>
                <div className="mt-4 flex items-center gap-4">
                  <button onClick={() => toggleLike(t)} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300">Like</button>
                  <span className="text-base text-gray-600 dark:text-gray-300">{t.likes?.length || 0} likes</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
            <h3 className="font-semibold mb-3">Who to follow</h3>
            <ul className="space-y-3">
              {whoToFollow.map((u) => (
                <li key={u._id || u.id} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                  <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{u.name || u.fullName || 'User'}</div>
                    <div className="text-xs text-gray-500 truncate">{u.email || u.username}</div>
                  </div>
                </li>
              ))}
            </ul>
            {isAuthenticated && (
              <div className="mt-4 text-center">
                <button disabled={usersLoading} onClick={() => loadUsers(usersOffset)} className="text-sm px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-60 text-gray-700 dark:text-gray-300">
                  {usersLoading ? 'Loading...' : 'Load more'}
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full px-6 py-3 shadow-lg hover:bg-blue-600">
        New Tweet
      </button>
    </div>
  );
};

export default Feed;


