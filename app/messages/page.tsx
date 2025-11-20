
import MessageList from "./MessageList"
import MessageForm from "./MessageForm"

export default async function MessagesPage() {

    return  <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <MessageForm />
     <MessageList />
     
    </div>
    
}