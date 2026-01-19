import { create } from "zustand";
import { Message } from "../types/Message";
import { Meta } from "../types/Meta";

interface MessagesState {
  messages: Message[];
  meta: Meta;
  fetch: () => void;
}

const useMessagesStore = create<MessagesState>()((set) => ({
  messages: [],
  meta: {
    next: null,
    prev: null,
  },
  fetch: async () => {
    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      set(() => ({
        messages: data.data,
        meta: data.meta,
      }));
    } else {
      console.log("err");
    }
  },
}));

export default useMessagesStore;
