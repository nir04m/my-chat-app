// import axios from "axios";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.ts";
import toast from "react-hot-toast";

export interface User {
  id: string;
  name: string;
  email: string;
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
  }

  logout: async () => {
    try {} catch (error) {}
  },

}));
