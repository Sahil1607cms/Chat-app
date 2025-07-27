import React from "react";
import { useMessageStore } from "../store/useMessageStore";
import { X } from "lucide-react";

const LoadingMessages = () => {
  const dummyMessages = Array.from({ length: 6 });
  const { selectedUser,unsetSelectedUser, setImageOpen, unsetImageOpen } = useMessageStore();

  return (
    <div className="w-full relative full-bg h-[calc(100vh-72px)]">
      {/* header */}
      <div className="flex justify-between w-full bg-gray-900 rounded-t-2xl px-5 py-4 items-center">
        <div className="flex items-center gap-3 font-bold text-xl">
          <img
            src={selectedUser?.profilePic || "./user.png"}
            alt="user"
            className="size-9 rounded-full bg-gray-400 object-cover cursor-pointer"
          />
          <p>{selectedUser?.fullName}</p>
        </div>
        <X className="w-6 h-6 cursor-pointer" 
        onClick={() => unsetSelectedUser()}
        />
      </div>

      {/* chats loading skeleton */}
      {dummyMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="chat-image ">
            <div className="w-10 h-10 rounded-full skeleton bg-gray-600" />
          </div>
          <div className="chat-bubble bg-gray-600 skeleton text-transparent">
            <div className="h-4 w-40 mb-2 bg-gray-600 rounded" />
            <div className="h-4 w-28 bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingMessages;
