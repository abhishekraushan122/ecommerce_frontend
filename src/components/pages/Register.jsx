
import React, { useContext, useState } from "react";
import api from "../../api/axiosClient";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { setToken, setUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      // backend returned token + user in earlier code; adjust if different
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      alert("Registered & logged in");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={registerUser}>
        <input className="w-full p-3 border rounded mb-3" placeholder="Name" value={name}
               onChange={(e)=>setName(e.target.value)} />
        <input className="w-full p-3 border rounded mb-3" placeholder="Email" value={email}
               onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-3 border rounded mb-3" placeholder="Password" type="password" value={password}
               onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
    </div>
  );
}
