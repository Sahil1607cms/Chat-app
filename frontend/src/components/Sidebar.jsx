import React from "react";
import { Loader, Users } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore.js";
import { useEffect } from "react";
import LoadingChat from "./LoadingChat.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const Sidebar = () => {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading, isImageOpen, setImageOpen, unsetImageOpen} =
    useMessageStore();
  const { onlineUsers } = useAuthStore();

  //getting the list of users from database excluding the loggedIn user
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUsersLoading) return <LoadingChat />;

  return (
    <aside
      className="h-[calc(100vh-72px)] w-full max-w-md bg-gray-800 rounded-2xl
    flex flex-col "
    >
      {/* Header */}
      <div className="border-b bg-gray-900 border-base-300 rounded-t-2xl text-xl w-full p-5">
        {/* header */}
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      {/* Contact list  */}
      <div className="overflow-y-auto h-full w-full pb-3">
        {users.map((user) => (
          // Profile+name+online/offline status
          <button
            key={user._id}
            className={`w-full px-4 py-2 flex items-center gap-4 transition-colors 
    hover:bg-gray-700 cursor-pointer border-b-1 border-b-gray-700 border-t-1 border-t-gray-700
    ${
      selectedUser?._id === user._id
        ? "bg-gray-700 border-l-6  border-blue-400"
        : ""
    }
  `}
            onClick={() => setSelectedUser(user)}
          >
            <div className="relative">
              {/* Profile picture */}
              <img
                src={user.profilePic || "./user.png"}
                alt="user"
                className="size-12 rounded-full bg-gray-400 object-cover"
              />
              {/* active user dot  */}
              {onlineUsers.includes(user._id) && (
                <span className="absolute top-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            {/* Fullname */}
            <div className="flex flex-col text-left">
              <p className="font-bold text-white">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <p className="text-green-300">Online</p>
              ) : (
                <p className="text-red-300">Offline</p>
              )}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
