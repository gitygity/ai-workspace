"use client"

import { createMessageAction } from "@/actions/messageActions"
import { useMessageStore } from "@/store/messageStore"
import { useState } from "react"

export default function MessageForm(){
    const [text,setText]=useState('')
    const setOptimisticMessage=useMessageStore((s)=>s.setOptimisticMessage)


    async function handleSubmitMessage(e:React.FormEvent){
        e.preventDefault()
        setOptimisticMessage(text)
        await createMessageAction(text)
        setText('')
    }

    return   <form onSubmit={handleSubmitMessage} className="flex gap-2 mt-4">
      <input
        className="border p-2 flex-1"
        placeholder="Write a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Send
      </button>
    </form>
}