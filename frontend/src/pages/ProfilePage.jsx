import { Camera, Loader2, LoaderCircle, Mail, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, isHydrated } =
    useAuthStore();
  console.log("authUser", authUser);
  console.log("isHydrated", isHydrated);
  const [selectedImage, setSelectedImage] = useState(null);
  const date = new Date(authUser.createdAt);
  const createdAt = date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  console.log("Profile updation page");
  console.log(authUser);

  const handleImageUpload = async (e) => {
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
    <div className="h-[calc(100vh-56px)] flex items-center justify-center flex-col gap-8 text-white  bg-gray-900">
      <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 w-full max-w-md h-auto py-6 px-4 border-1 rounded-lg ">
        <h1 className="text-center pb-5 text-3xl font-bold text-white">
          Profile{" "}
        </h1>

        {/* profile picture */}
        <div className="logo mx-auto rounded-full relative size-38 bg-white  flex flex-col items-center justify-center">
          <img
            className="rounded-full size-38 object-cover "
            src={selectedImage || authUser?.profilePic || "user.png"}
            alt="/user.png"
          />
          <label>
            <Camera className="absolute right-1 bottom-0 size-10 cursor-pointer p-1  bg-white rounded-[50%] text-black" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-center font-bold text-white p-2 ">
          {isUpdatingProfile ? (
            <>
              Updating <Loader2 className="inline animate-spin" />
            </>
          ) : (
            "Tap the camera to update profile picture"
          )}
        </p>

        {/* full name and email display */}
        <div className="user-details mt-6 bg-gray-900 py-4 px-8 rounded-4xl">
          <label className="flex flex-col mb-2 py-1">
            <label className="flex pb-1 gap-1 font-bold text-white">
              <User />
              <p>Full Name</p>
            </label>
            <p className=" rounded-2xl py-1">
              {authUser?.fullName}
            </p>
          </label>
          <label className="flex flex-col mb-2 py-1">
            <label className="flex pb-1 gap-2 font-bold text-white">
              <Mail />
              <p className="">Email Address</p>
            </label>
            <p className=" rounded-2xl  py-1">{authUser?.email} </p>
          </label>
        </div>
      </div>
      <div className="bottom-container bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 w-full max-w-md py-6 px-12 border-1 rounded-lg">
        <label className="flex items-center mb-4 justify-between">
          <p className="text-white font-bold">Member since</p>
          <p>{authUser?.createdAt ? createdAt : "Fetching..."}</p>
        </label>
        <div className="w-full mx-auto h-0.5 mb-4 bg-gray-500"></div>
        <label className="flex items-center justify-between">
          <p className="text-white font-bold">Account Status</p>
          <p className="text-green-400">Active</p>
        </label>
      </div>
    </div>
  );
};

export default ProfilePage;
