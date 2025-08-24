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
      toast.error(error.response.statusText);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();    // to get the state values
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // listen to the msgs which are coming in real time
  subscribeToMessages: () => {
    const { selectedUser } = get();
    // if not selected user then no need to do
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;   // getting socket state from another store(help of zustand)

    // todo: optimise this one later
    socket.on("newMessage", (newMessage) => {
      set({
        messages: [...get().messages, newMessage],   // keeping all the msg in the past and adding new one
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  // todo: optimise this one later   
  setSelectedUser: (selectedUser) => set({ selectedUser }),  // use to select the user to show on right
}));