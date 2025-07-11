import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import NoChatContainer from '../components/NoChatContainer.jsx'
import { useMessageStore } from "../store/useMessageStore.js";
 
const Homepage = () => {

  const {selectedUser} = useMessageStore();
  return (
    <div className='flex gap-2 px-6 pt-2'>
      <Sidebar/>
      {selectedUser?<ChatContainer/>:<NoChatContainer/>}
      
    </div>
  )
}

export default Homepage