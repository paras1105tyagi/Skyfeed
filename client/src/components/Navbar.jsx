import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, toggle } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
         <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
       <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
         <Link to="/" className="text-xl font-semibold text-gray-900 dark:text-white">
           Skyfeed
         </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"}>Home</NavLink>
          <button onClick={toggle} aria-label="Toggle theme" title="Toggle theme" className="px-2 py-1 rounded hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {darkMode ? '🌞' : '🌙'}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-3 py-1.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Logout</button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"}>Signup</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


