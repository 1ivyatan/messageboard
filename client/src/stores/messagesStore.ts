import { create } from "zustand";
import { Message } from "../types/Message";
import { Meta } from "../types/Meta";
import { Status } from "../types/Status";
import { Cursor } from "../types/Cursor";
import Pagination from "../types/Pagination";

const metaInitialState: Meta = {
  next: null,
  prev: null,
};

const cursorInitialState: Cursor = {
  id: null,
  origin: Pagination.Prev,
};

interface MessagesProps {
  cursor: Cursor;
  messages: Message[];
  meta: Meta;
  status: Status;
}

interface MessagesState extends MessagesProps {
  fetch: () => void;
}

const messagesInitialState: MessagesState = {
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  cursor: cursorInitialState,
  fetch: () => {},
};

const useMessagesStore = create<MessagesState>()((set) => ({
  ...messagesInitialState,
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

      console.log(data);
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
