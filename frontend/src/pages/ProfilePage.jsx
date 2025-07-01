import { Camera } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { isUpdatingProfile, updateProfile, authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser && !isCheckingAuth) {
      checkAuth();
    }
    if (!authUser && !isCheckingAuth) {
      navigate("/login");
    }
  }, [authUser, isCheckingAuth, checkAuth, navigate]);

  if (isCheckingAuth) {
    return <div className="text-white">Loading profile...</div>;
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64 = reader.result;
      setSelectedImage(base64);
      try {
        await updateProfile({ profilePic: base64 });
      } catch (error) {
        console.log("Profile upload failed ", error);
      }
    };
  };
  return (
    <div className="h-[calc(100vh-56px)] flex items-center justify-center flex-col gap-8 text-white bg-gray-950">
      <div className="bg-gray-700 w-full max-w-md h-auto py-6 px-4 rounded-lg ">
        <h1 className="text-center pb-5 text-3xl font-bold">Profile </h1>

        {/* profile picture */}
        <div className="logo mx-auto size-38 relative rounded-[50%]   bg-white flex flex-col items-center justify-center">
          <label>
            <Camera className="absolute right-1 bottom-0 size-10 p-1  bg-white rounded-[50%] text-black" />
            <img
              className="rounded-[50%] size-[150px] object-cover "
              src={selectedImage || authUser?.data?.profilePic || "user.png"}
              alt="/user.png"
            />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleChange}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-center p-2 ">Tap the avatar to update</p>

        {/* full name and email display */}
        <div className="user-details mt-6 ">
          <label className="flex flex-col mb-2 py-1">
            <p className="px-4 pb-1">Full Name</p>
            <p className="border-2 rounded-2xl px-4 py-1">
              {authUser?.data?.fullName}
            </p>
          </label>
          <label className="flex flex-col mb-2 py-1">
            <p className="px-4 pb-1">Email Address</p>
            <p className="border-2 rounded-2xl px-4 py-1">
              {authUser?.data?.email}{" "}
            </p>
          </label>
        </div>
      </div>
      <div className="bottom-container bg-gray-700 w-full max-w-md py-6 px-4 rounded-lg">
        <label className="flex items-center mb-4 justify-between">
          <p>Member since</p>
          <p>
            {authUser?.data?.createdAt
              ? authUser.data.createdAt.split("T")[0]
              : "Fetching..."}
          </p>
        </label>
        <div className="w-full mx-auto h-0.5 mb-4 bg-gray-500"></div>
        <label className="flex items-center justify-between">
          <p>Account Status</p>
          <p className="text-green-400">Active</p>
        </label>
      </div>
    </div>
  );
};

export default ProfilePage;
