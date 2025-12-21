
import React, { useContext, useState } from "react";
import api from "../../api/axiosClient.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setToken, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={loginUser}>
        <input className="w-full p-3 border rounded mb-3" placeholder="Email" value={email}
               onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-3 border rounded mb-3" placeholder="Password" type="password" value={password}
               onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">Don't have an account? <a href="/register" className="text-blue-600">Register</a></p>
    </div>
  );
}
