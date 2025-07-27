import { React, useEffect, useRef } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowDown} from "lucide-react";
import LoadingMessages from "./LoadingMessages";
import Input from "../components/Input.jsx";
import ChatHeader from "./ChatHeader.jsx";
import { formatTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    getMessages,
    isMessagesLoading,
    messages,
    selectedUser,
    unsetSelectedUser,
    isImageOpen,
    setImageOpen,
    unsetImageOpen,
  } = useMessageStore();

  const bottomScroll = useRef(null);
  const { authUser } = useAuthStore();
  console.log(messages);

  //fetch the messages between sender and user
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);
  useEffect(() => {
  if (bottomScroll.current) {
    bottomScroll.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);


  if (isMessagesLoading) return <LoadingMessages />;

  return (
    // full chat container div from top to bottom
    <div className="bg-gray-800 w-full  h-[calc(100vh-72px)] full-bg rounded-2xl overflow-hidden flex flex-col">
      {/* HEADER */}
      <ChatHeader />

      <div className="flex-1 flex flex-col overflow-y-auto gap-5  p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderID === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderID === authUser._id
                      ? authUser.profilePic || "./user.png"
                      : selectedUser.profilePic || "./user.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="chat-bubble flex flex-col my-1 bg-gray-600">
              {message.image && (
                <img
                  src={message.image}
                  alt="attachment"
                  className="w-[200px] rounded-lg "
                />
              )}
              {message.text && <p className="text-sm mt-2 ">{message.text}</p>}
            </div>
            <div className="chat-footer">
              <time>{formatTime(message.createdAt)}</time>
            </div>
          </div>
        ))}
        <div ref={bottomScroll} />
      </div>
      <span>
        <ArrowDown className="bg-white p-1 ml-2 rounded-full text-black size-7 cursor-pointer"
        onClick={()=> bottomScroll.current?.scrollIntoView({behavior: "smooth"})}
      />
      </span>
      <Input/>
    </div>
  );
};

export default ChatContainer;
