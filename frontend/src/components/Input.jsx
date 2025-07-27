import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { X,Image, Send, ArrowDown } from "lucide-react";
import toast from "react-hot-toast";
const Input = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
    const textCursor = useRef(null);
  const { sendMessages ,selectedUser} = useMessageStore();

  useEffect(()=>{
    textCursor.current?.focus()
  },[selectedUser])
  const handleImageChange = (e) => {
    //selecting the first image out of multiple selected images 
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }
    //built in web api provided by the browser
    const reader = new FileReader();
    //after the file is fully loaded set imagepreview
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    //triggers onloadend when done reading 
    reader.readAsDataURL(file);
  };
  const removeImage = (e) => {
    setImagePreview(null)
    if(fileInputRef.current) fileInputRef.current.value=""
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    //if both of them are empty, return directly
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessages({
        text: text.trim(),
        image: imagePreview,
      });
      toast.success("Message sent")
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } 
    catch (error) {
      console.error("Failed to send message:", error);
    }
  };
  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm focus:outline-none "
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textCursor}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button 
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>

          <button
            type="submit"
            className={` btn btn-circle`}
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Input;
