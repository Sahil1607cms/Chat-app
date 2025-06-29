import React, { useState } from "react";
import {
  Mail,
  User,
  Lock,
  MessageSquare,
  Eye,
  Key,
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
    if (!formData.username.trim()) {
      toast.error("Username is required!");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email is required!");
      return false;
    }

    // Basic email pattern check
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

    return true; // All checks passed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation/submit logic here
    if (validateForm()) login(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Left Side - Image */}
      <div className=" flex relative items-center justify-center md:block  h-full bg-purple-950">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/071/017/non_2x/abstract-background-3d-purple-yellow-white-geometric-squares-shape-design-paper-cut-style-vector.jpg" // 🔁 Replace with actual path
          alt="Sign up visual"
          className="w-[98%] h-[98%] object-cover absolute left-[10px] top-[10px] rounded-3xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full h-full text flex flex-col items-center justify-center bg-purple-950">
        <div className="w-[90%] md:w-[75%]  px-6 py-8 rounded-lg shadow-lg">
          <h1 className="text-5xl text-white font-semibold mb-4 ">
            Welcome, Please Login to continue
          </h1>
          <p className="mb-6 text-gray-400">
            Dont have an account?{" "}
            <Link to="/register" className="text-purple-600 text-yellow-300 hover:underline">
              Sign Up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md  bg-purple-200 focus:outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md  bg-purple-200 focus:outline-none"
              required
            />
            <div className="relative ">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md  bg-purple-200 focus:outline-none pr-10"
                required
              />

              {showPassword ? (
                <Eye
                  className="absolute right-3 top-2.5 text-gray-500  cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <EyeOff
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {isLoggingIn && <Loader2 className=" size-5 animate-spin" />}
              {!isLoggingIn ?  "Login" : "Logging in ..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
