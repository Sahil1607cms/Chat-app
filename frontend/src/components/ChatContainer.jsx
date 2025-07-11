import {React, useState} from "react";
import { useMessageStore } from "../store/useMessageStore";
import { Cross, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    getMessages,
    isMessagesLoading,
    messages,
    selectedUser,
    unsetSelectedUser,
    isImageOpen,
    setImageOpen,
    unsetImageOpen
  } = useMessageStore();
 

  return (
    <div className={`bg-gray-800 w-full h-[calc(100vh-72px)] relative rounded-2xl full-bg `}>

      {/* header */}
      <div className="flex justify-between bg-gray-900 rounded-t-2xl px-5 py-4 items-center">
        <div className="flex items-center gap-3 font-bold text-xl">
          <img
            src={selectedUser?.profilePic || "./user.png"}
            alt="user"
            className="size-9 rounded-full bg-gray-400 object-cover"
            onClick={() => setImageOpen()}
          />
          <p>{selectedUser?.fullName}</p>
        </div>
        <X className="w-6 h-6" onClick={() => unsetSelectedUser()} />
      </div>

      {/* big image container  */}
      {
        isImageOpen && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
            <img
            src={selectedUser?.profilePic || "./user.png"}
            alt="user"
            className="size-100 rounded-lg  bg-gray-400 object-cover"
          />
          <X className="absolute -top-5 -right-5 bg-gray-600 rounded-full size-10" onClick={() => unsetImageOpen()}/>
          </div>
        )
      }
    </div>
  );
};

export default ChatContainer;
