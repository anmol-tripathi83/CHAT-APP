import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({ //<- this is object which return        // setter and getter  
  messages: [],         // some messages
  users: [],
  selectedUser: null,      // currenlty selected user will appear on right
  isUsersLoading: false,
  isMessagesLoading: false,     // used to show some skelton till message is loading

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // todo: optimise this one later 
  setSelectedUser: (selectedUser) => set({ selectedUser }),  // use to select the user to show on right
}));