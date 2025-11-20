import { Message } from "@/types/models";
import { create } from "zustand";

type MessageStore = {
  messages: Message[];
  setMessages: (data: Message[]) => void;
  setOptimisticMessage: (text: string) => void;
  fetchMessages: () => Promise<void>;
};

export const useMessageStore = create<MessageStore>((set) => ({
  messages: [],
  setMessages: (data: Message[]) => set({ messages: data }),
  fetchMessages: async () => {
    const res = await fetch("/api/messages", { cache: "no-store" });
    const data = await res.json();
    set({ messages: data || [] });
  },
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
