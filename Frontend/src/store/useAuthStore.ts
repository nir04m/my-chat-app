// import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";

export interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  profilePic: string | null;
  // Add other fields as needed
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  // Add other fields as required
}

export interface AuthStore {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  checkAuth: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try{
        const res = await axiosInstance.get<User>("/auth/check");
        set({ authUser: res.data});
    } catch (error) {
        console.log("Error checking authentication:", error);
        set({ authUser: null });
    } finally {
        set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
        const res = await axiosInstance.post<User>("/auth/signup", data);
        toast.success("Signup successful! Welcome!");
        set({ authUser: res.data });
    } catch (error) {
        toast.error((error as any).response?.data?.message || "Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },


  login: async (data) => {
    set({ isLoggingIn: true });
    try {
        const res = await axiosInstance.post<User>("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Login successful! Welcome back!");
    } catch (error) {
        toast.error((error as any).response?.data?.message || "Login failed. Please try again.");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("Logged out successfully.");
    } catch (error) {
        toast.error((error as any).response?.data?.message || "Logout failed. Please try again.");
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isUpdatingProfile: true });
    try {
        const res = await axiosInstance.put<User>("/auth/update-profile", data);
        set({ authUser: res.data });
        toast.success("Profile updated successfully!");
    } catch (error) {
        toast.error((error as any).response?.data?.message || "Profile update failed. Please try again.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },


}));
