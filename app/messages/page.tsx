import { Message } from "@/types/models"
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"

export default async function MessagesPage() {
    const rawData=await fetch('http://localhost:3000/api/messages',{cache:'no-store'})
    const data= await rawData.json() 
    const messages= data.messages||[] as Message[]
    
    return  <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <MessageForm />
     <MessageList initialMessages={messages} />
     
    </div>
    
}