import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#22d3ee33,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_#8b5cf633,_transparent_60%)]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl 
                      border border-white/10 shadow-2xl p-8">

        <h1 className="text-3xl font-semibold text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 text-center mb-8">
          Sign in to access your crypto dashboard
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1">
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg 
                          bg-black/40 border border-white/10 
                          focus-within:border-cyan-400 transition">
            <Mail size={16} className="text-gray-400" />
            <input
              type="email"
              placeholder="you@crypto.com"
              className="bg-transparent w-full outline-none text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs text-gray-400 mb-1">
            Password
          </label>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg 
                          bg-black/40 border border-white/10 
                          focus-within:border-cyan-400 transition">
            <Lock size={16} className="text-gray-400" />
            <input
              type="password"
              placeholder="••••••••"
              className="bg-transparent w-full outline-none text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={submit}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-lg 
                     font-medium bg-gradient-to-r from-violet-500 to-cyan-400 
                     hover:opacity-90 transition"
        >
          Login
          <ArrowRight size={18} />
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Secured with JWT authentication
        </p>
      </div>
    </div>
  );
}
