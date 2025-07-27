import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { persist } from "zustand/middleware";

export const useMessageStore = create(
  persist(
    (set, get) => ({
      messages: [],
      users: [],
      selectedUser: null,
      isMessagesLoading: false,
      isUsersLoading: false,
      isImageOpen: false,

      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("messages/users");
          set({ users: res.data.data.filteredUsers });
        } catch (error) {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getMessages: async (userID) => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(`messages/${userID}`);
          set({ messages: res.data.data.messages });
        } catch (error) {
          console.log('getMessages error:',error);
          toast.error(error.response.data.message);
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessages: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
          const res = await axiosInstance.post(
            `messages/send/${selectedUser._id}`,
            messageData
          );
          console.log(res.data.data.message)
          // Ensure messages is an array before spreading
          const currentMessages = Array.isArray(messages) ? messages : [];
          set({ messages: [...currentMessages, res.data.data.message] });
        } catch (error) {
          console.log('sendMessages error:', error);
          toast.error(
            error.response?.data?.message || "Failed to send message"
          );
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      setSelectedUser: (selectedUser) => {
        set({ selectedUser });
        set({ isImageOpen: false });
      },

      unsetSelectedUser: () => {
        set({ selectedUser: null });
        localStorage.removeItem("selectedUser");
      },
      setImageOpen: () => {
        set({ isImageOpen: true });
      },
      unsetImageOpen: () => {
        set({ isImageOpen: false });
      },
    }),
    {
      name: "selectedUser",
      //making sure only selectedUser gets stored in the local storage
      partialize: (state) => ({ selectedUser: state.selectedUser }),
    }
  )
);
