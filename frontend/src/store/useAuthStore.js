import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,

  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checking auth");
      set({ authUser: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    console.log("Sending signup data:", data);
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      toast.success("Account created successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error while signing up:", error);
      console.log("Error response:", error.response?.data);
      console.log("Error status:", error.response?.status);
      
      // Show error message to user
      const errorMessage = error.response?.data?.message || error.message || "Signup failed";
      toast.error(errorMessage);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Logged in successfully");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error while logging in:", error);
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));
