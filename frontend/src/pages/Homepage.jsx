import React from 'react'
import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'

const Homepage = () => {
  return (
    <div className='flex gap-2 px-6 py-4'>
      <Sidebar/>
      <ChatContainer/>
    </div>
  )
}

export default Homepage