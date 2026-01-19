import { create } from "zustand";
import { Message } from "../types/Message";
import { Meta } from "../types/Meta";
import { Status } from "../types/Status";
import { Cursor } from "../types/Cursor";
import Pagination from "../types/Pagination";
import { VoteType } from "../types/VoteType";

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
  sendVote: (id: String, oldVote: VoteType, newVote: VoteType) => any;
}

const messagesInitialState: MessagesState = {
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  cursor: cursorInitialState,
  fetchIndex: async () => {},
  fetchByCursor: async () => {},
  fetchNext: async () => {},
  fetchPrev: async () => {},
  fetchData: async (urlExtras: String) => {},
  sendVote: (id: String, oldVote: VoteType, newVote: VoteType) => {},
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

  sendVote: async (
    id: String,
    oldVote: VoteType,
    newVote: VoteType,
  ): Promise<boolean> => {
    const message = get().messages.filter((message) => {
      return message._id === id;
    })[0];

    const method =
      oldVote === VoteType.None
        ? "POST"
        : newVote !== oldVote
          ? "PATCH"
          : "DELETE";

    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages/${id}/vote`;

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vote: newVote as string,
      }),
    });

    return response.ok;
  },
}));

export default useMessagesStore;
