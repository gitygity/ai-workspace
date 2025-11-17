"use client";

import { useMessageStore } from "@/store/messageStore";
import { Message } from "@/types/models";
import { useEffect } from "react";

export default function MessageList({initialMessages}:{initialMessages :Message[]}) {
  const { messages, setMessages } = useMessageStore();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages,setMessages]);

  return (
    <div className="space-y-3">
      {messages?.map((m) => (
        <div key={m.id} className="p-3 bg-gray-100 rounded-md">
          <p>{m.text}</p>
          <small className="text-gray-500">{m.createdAt}</small>
        </div>
      ))}
    </div>
  );
}