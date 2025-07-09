import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const useMessageStore = create((set)=>({

    messages:[],
    users:[],
    selectedUser: null,
    isMessagesLoading:false,
    isUsersLoading:false,

    getUsers: async()=>{
        set({isUsersLoading:true})
       try {
         const res = await axiosInstance.get("/users")
         set({users:res.data.filteredUsers})
       } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
       }
       finally{
        set({isUsersLoading:false})
       }
    },

    getMessages: async(userID)=>{
        set({isMessagesLoading:true})
       try {
         const res = await axiosInstance.get(`messages/${userID}`)
         set({users:res.data.messages})
       } catch (error) {
        console.log(error.response.data.message)
        toast.error(error.response.data.message)
       }
       finally{
        set({isMessagesLoading:false})
       }
    },

    

}))