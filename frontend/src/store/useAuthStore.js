import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import {persist} from "zustand/middleware"

export const useAuthStore = create(
  persist((set) => ({
    authUser: null,

    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

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
        const errorMessage =
          error.response?.data?.message || error.message || "Signup failed";
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
        toast.error(
          error.response?.data?.message 
        );
      } finally {
        set({ isLoggingIn: false });
      }
    },

    logout: async () => {
      try {
        const res = await axiosInstance.post("/auth/logout");
        toast.success("Logged out successfully");
        set({ authUser: null });
      } catch (error) {
        console.log("Error while logging out:", error);
        toast.error(error.response.data.message);
      } finally {
        set({ isLoggingIn: false });
        localStorage.removeItem("auth-storage")
      }
    },

    updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
        const res = await axiosInstance.put("/auth/update-profile", data);
        console.log("profile picture updated successfully");
        set({ authUser: res.data });
        toast.success("Profile picture updated successfulyl");
      } catch (error) {
        console.log("Failed to update profile picture");
        toast.error("Something went wrong", error.response.data.message);
      } finally {
        set({ isUpdatingProfile: false });
      }
    },
  }),
  {
    name: "auth-storage",
    getStorage : ()=>localStorage
  }
)
);
