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
  postDelay: number | null;
}

interface MessagesState extends MessagesProps {
  fetchIndex: () => void;
  fetchByCursor: () => void;
  fetchNext: () => void;
  fetchPrev: () => void;
  fetchData: (urlExtras: String) => void;
  fetchPostDelay: () => void;
  sendVote: (id: String, oldVote: VoteType, newVote: VoteType) => any;
  sendMessage: (title: String, body: String) => any;
  setPostDelay: (seconds: number) => void;
}

const messagesInitialState: MessagesState = {
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  cursor: cursorInitialState,
  postDelay: null,
  fetchIndex: async () => {},
  fetchByCursor: async () => {},
  fetchNext: async () => {},
  fetchPrev: async () => {},
  fetchData: async (urlExtras: String) => {},
  fetchPostDelay: async () => {},
  sendVote: async (id: String, oldVote: VoteType, newVote: VoteType) => {},
  sendMessage: async (title: String, body: String) => {},
  setPostDelay: (seconds: number) => {},
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

  fetchPostDelay: async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE || "/api"}/messages/delay`,
    );

    if (response.ok) {
      const data = await response.json();
      get().setPostDelay(data.delay);
    } else {
    }
  },

  sendVote: async (
    id: String,
    oldVote: VoteType,
    newVote: VoteType,
  ): Promise<boolean> => {
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

  sendMessage: async (title: String, body: String): Promise<boolean> => {
    const delay = get().postDelay;
    if (delay == null || delay > 0) {
      return false;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE || "/api"}/messages`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          body: body,
        }),
      },
    );

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  },

  setPostDelay: (seconds: number) => {
    set(() => ({
      postDelay: seconds,
    }));
  },
}));

export default useMessagesStore;
