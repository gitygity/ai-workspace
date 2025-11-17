import { Message } from "@/types/models";
import { create } from "zustand";


type MessageStore = {
  messages: Message[];
  setMessages: (data: Message[]) => void;
  setOptimisticMessage: (text: string) => void;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (data: Message[]) => set({ messages: data }),
  setOptimisticMessage: (text) =>
    set((state) => ({
      messages: [
        {
          text,
          id: "optimistic-" + Math.random(),
          createdAt: new Date().toISOString(),
        },
        ...state.messages,
      ],
    })),
}));
