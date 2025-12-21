import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext.jsx";   // ✅ FIXED

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold">ShopEase</Link>

        <div className="flex items-center gap-6">
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Hello, <strong>{user.name}</strong></span>
              <button onClick={handleLogout} className="px-3 py-1 border rounded">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="hover:text-blue-600">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
