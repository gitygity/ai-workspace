"use client";

import { useMessageStore } from "../../store/messageStore";
import { useEffect } from "react";



export default function MessageList() {
  const fetchMessages = useMessageStore((s) => s.fetchMessages);
const messages = useMessageStore((s) => {
  return s.messages;
});

  
  useEffect(()=>{ 
    fetchMessages()
  },[fetchMessages])
  
  return (
    <div className="space-y-3">{messages.length}
      {messages?.map((m) => (
        <div key={m.id} className="p-3 bg-gray-100 rounded-md">
          <p>{m.text}</p>
          <small className="text-gray-500">{m.createdAt}</small>
        </div>
      ))}
    </div>
  );
}