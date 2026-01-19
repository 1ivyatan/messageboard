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
  fetchIndex: () => void;
  fetchByCursor: () => void;
  fetchNext: () => void;
  fetchPrev: () => void;
  fetchData: (urlExtras: String) => void;
}

const messagesInitialState: MessagesState = {
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  cursor: cursorInitialState,
  fetchIndex: () => {},
  fetchByCursor: () => {},
  fetchNext: () => {},
  fetchPrev: () => {},
  fetchData: (urlExtras: String) => {},
};

const useMessagesStore = create<MessagesState>()((set, get) => ({
  ...messagesInitialState,

  fetchData: async (urlExtras: String) => {
    set(() => ({
      status: Status.Loading,
    }));

    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages${urlExtras}`;
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
        cursor: cursorInitialState,
      }));
    }
  },

  fetchIndex: async () => {
    get().fetchData("");
  },

  fetchNext: async () => {
    const next = get().meta.next;

    if (next !== null && next !== "") {
      get().fetchData(`?${Pagination.Next}=${get().meta.next}`);
    }
  },

  fetchPrev: async () => {
    const prev = get().meta.prev;

    if (prev !== null && prev !== "") {
      get().fetchData(`?${Pagination.Prev}=${get().meta.prev}`);
    }
  },
}));

export default useMessagesStore;
