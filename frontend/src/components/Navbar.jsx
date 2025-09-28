import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">XExit</Link>
      <div className="flex gap-4">
        {user ? (
          <>
            
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout} className="bg-red-500 px-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
