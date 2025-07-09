import React from "react";
import { Loader2Icon, User } from "lucide-react";
import { useMessageStore } from "../store/useMessageStore.js";
import { useEffect } from "react";
const Sidebar = () => { 
  const {users, getUsers, selectedUsers, isUsersLoading } = useMessageStore()

  useEffect(()=>{
    getUsers()
  },[getUsers])
  
  if(!isUsersLoading) <Loader2Icon/>
    return (
    <div className="bg-amber-900 w-full max-w-md h-[90vh] rounded-2xl">
      <div>
        <div className="p-3 flex gap-2 font-bold text-xl">
          <User />
          <p>Contacts </p>
        </div>
        <div>Show online members todo</div>
      </div>
    </div>
  );
};

export default Sidebar;
