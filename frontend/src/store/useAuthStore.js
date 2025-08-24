import { create } from "zustand";         // globally state management
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const Base_URL = "http://localhost:5001";

// Authentication store(various auth state manages)
export const useAuthStore = create((set, get) =>({        // this object is our initialstate and set is seter function
    authUser: null,        // state tells whether use is authenticated or not
    isSigningUp: false,    // tells whether user is signing or not
    isLoggingIn: false,    // tells whether user is logging or not
    isUpdatingProfile: false,   // tells whether user is updating Profile or not
    isCheckingAuth: true,        // to check authentic user
    onlineUsers: [],
    socket: null,

    checkAuth: async () =>{
        set({ isCheckingAuth: true });
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});

            // call to connect to the socket using get function to call connectSocket functn
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth store:", error.message);
            set({authUser: null});
        } finally{
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) =>{
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post("auth/signup", data);
            set({authUser: res.data});
            toast.success("Account created successfully");

            // call to connect to the socket using get function to call connectSocket functn
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in Signup store:", error);
        } finally {
            set({isSigningUp: false});
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            console.log("Login response:", res);  // 👈 check here
            set({ authUser: res.data });
            toast.success("Logged in successfully");

            // call to connect to the socket using get function to call connectSocket functn
            get().connectSocket();
        } catch (error) {
            console.log("Error in login store:", error);  // 👈 log full error
            toast.error(error?.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () =>{
        try {
            axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Logged out successfully");

            // call disconnect socket
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout store:", error.message);
            toast.error(error.response.data.message);
        } 
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true}); 
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({authUser: res.data});
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.log("error in Update profile store:", error);
            toast.error(error.response.data.message);
        } finally{
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () =>{
        // when user is not authenticated then we dont even connect to socket or if already connected then also
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return; 

        const socket = io(Base_URL);
        socket.connect();
        // update the state
        set({socket: socket});
    },
    
    disconnectSocket: () =>{
        if (get().socket?.connected) get().socket.disconnect();
    },
}));