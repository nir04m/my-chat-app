import { create  } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

interface ChatStore {
  messages: any[];
  users: any[];
  selectedUser: any | null;
  isMessagesLoading: boolean;
  isUsersLoading: boolean;
  setSelectedUser: (selectedUser: any) => void;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  sendMessage: (messageData: { text?: string; image?: string }) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      console.log("🔍 getUsers response:", response.data);
      set({ users: response.data });
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({messages: response.data });
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const {selectedUser, messages} = get()
    try{
      const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error((error as any).response?.data?.message || "Failed to send message");
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.on("newMessage", (newMessage) => {
        set((state) => ({ messages: [...state.messages, newMessage] }));
      });
    }
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },
  setSelectedUser: (selectedUser: any) => set({ selectedUser }),
}));