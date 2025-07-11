import { MessageCircle } from 'lucide-react';
import React from 'react';
const NoChatContainer = () => {
  return <div className="full-bg flex items-center justify-center flex-col gap-2">
    <h2 className='text-6xl text-center font-bold'>Welcome to ChatterBox</h2>
    <div className='flex  text-center gap-3 pt-4 font-bold text-xl'>
      <h3 >Select a chat to start conversation</h3>
    <MessageCircle/>
    </div>
  </div>;
};

export default NoChatContainer;
