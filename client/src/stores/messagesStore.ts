import { create } from "zustand";
import { Message } from "../types/Message";
import { Meta } from "../types/Meta";
import { Status } from "../types/Status";

interface MessagesState {
  messages: Message[];
  meta: Meta;
  status: Status;
  fetch: () => void;
}

const metaInitialState: Meta = {
  next: null,
  prev: null,
};

const useMessagesStore = create<MessagesState>()((set) => ({
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  fetch: async () => {
    set(() => ({
      status: Status.Loading,
    }));

    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      set(() => ({
        messages: data.data,
        meta: data.meta,
        status: Status.Success,
      }));
    } else {
      set(() => ({
        messages: [],
        meta: metaInitialState,
        status: Status.Error,
      }));
    }
  },
}));

export default useMessagesStore;
