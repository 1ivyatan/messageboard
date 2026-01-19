import { create } from "zustand";
import { Message } from "../types/Message";

interface MessagesState {
  messages: number;
  fetch: () => void;
}

const useMessagesStore = create<MessagesState>()((set) => ({
  messages: 0,
  fetch: async () => {
    set((state) => ({
      messages: state.messages + 1,
    }));
    // const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;
    // const response = await fetch(url);

    //if (response.ok) {
    // const data = response.json();
    // console.log(data);
    //} else {
    //  console.log("err");
    //}
  },
}));

export default useMessagesStore;
