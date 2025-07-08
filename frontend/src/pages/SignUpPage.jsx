import React, { useState } from "react";
import {
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isSigningUp, signUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.username.trim()) {
      toast.error("Username is required!");
      return false;
    }

    if (!formData.fullName.trim()) {
      toast.error("Full name is required!");
      return false;
    }

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
    if (validateForm()) signUp(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      {/* Left Side - Image */}
      {/* <div className="flex relative items-center justify-center md:block h-full">
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/071/017/non_2x/abstract-background-3d-purple-yellow-white-geometric-squares-shape-design-paper-cut-style-vector.jpg"
          alt="Sign up visual"
          className="w-full h-full object-cover"
        />
      </div> */}

      {/* Right Side - Form */} 
      <div className="w-full max-w-lg h-auto rounded-lg py-8 flex flex-col items-center justify-center border-1 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
        <div className="w-[90%] md:w-[75%] px-10 py-8 rounded-lg shadow-md text-white">
          <h1 className="text-5xl md:text-6xl text-yellow-400 font-semibold mb-4">
            Create an account
          </h1>
          <p className="mb-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-300 hover:underline">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
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
              {!isSigningUp ? "Register" : "Registering user..."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
