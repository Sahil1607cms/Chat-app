import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggingIn, login } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format!");
      return false;
    }

    if (!formData.password) {
      toast.error("Password is required!");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) login(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      
      <div className="w-full max-w-lg h-auto rounded-lg py-8 flex flex-col items-center border-1 justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="w-[90%] md:w-[75%] px-6 py-8 rounded-lg shadow-lg">
          <h1 className="text-5xl text-yellow-300 font-semibold mb-4">  
            Welcome, Please Login to continue
          </h1>
          <p className="mb-6 text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-yellow-300 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"  
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                required
              />

              {showPassword ? (
                <Eye
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-2.5 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition-colors"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="size-5 animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
