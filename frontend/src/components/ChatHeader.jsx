import { useMessageStore } from "../store/useMessageStore";
import { X } from "lucide-react";
const ChatHeader = () => {
  const {
    selectedUser,
    unsetSelectedUser,
    isImageOpen,
    setImageOpen,
    unsetImageOpen,
  } = useMessageStore();
  return (
    <div>
      <div className="flex justify-between bg-gray-900 rounded-t-2xl px-5 py-4 items-center">
        {/* image and name */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 font-bold text-xl">
            <img
              src={selectedUser?.profilePic || "./user.png"}
              alt="user"
              className="size-9 rounded-full bg-gray-400 object-cover cursor-pointer"
              onClick={setImageOpen}
            />
            <p>{selectedUser?.fullName}</p>
          </div>
          {/* CLOSE CHAT  */}
          <X className="w-6 h-6 cursor-pointer" onClick={unsetSelectedUser} />
        </div>

        {/* Big image popup */}
        {isImageOpen && (
          <div className="absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2   ">
            <div>
              <img
                src={selectedUser?.profilePic || "./user.png"}
                alt="user"
                className="w-[400px] h-[400px] rounded-full object-center"
              />
              <X
                className="absolute -top-4 -right-4 bg-gray-600 text-white rounded-full size-10 p-2 cursor-pointer"
                onClick={unsetImageOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
