import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Skyfeed
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}>Home</NavLink>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-3 py-1.5 rounded bg-gray-100 hover:bg-gray-200">Logout</button>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}>Login</NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-900"}>Signup</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


