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
  origin: null,
};

interface MessagesProps {
  messageCursor: Cursor;
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
  fetchData: (id: String | null, direction: Pagination | null) => void;
  fetchPostDelay: () => void;

  sendVote: (id: String, oldVote: VoteType, newVote: VoteType) => any;
  sendMessage: (title: String, body: String) => any;
  setPostDelay: (seconds: number | null) => void;
}

const messagesInitialState: MessagesState = {
  messages: [],
  meta: metaInitialState,
  status: Status.Loading,
  messageCursor: cursorInitialState,

  postDelay: null,
  fetchIndex: async () => {},
  fetchByCursor: async () => {},
  fetchNext: async () => {},
  fetchPrev: async () => {},
  fetchData: async (id: String | null, direction: Pagination | null) => {},
  fetchPostDelay: async () => {},

  sendVote: async (id: String, oldVote: VoteType, newVote: VoteType) => {},
  sendMessage: async (title: String, body: String) => {},
  setPostDelay: (seconds: number | null) => {},
};

const useMessagesStore = create<MessagesState>()((set, get) => ({
  ...messagesInitialState,

  fetchData: async (id: String | null, direction: Pagination | null) => {
    set(() => ({
      status: Status.Loading,
    }));

    const url = `${import.meta.env.VITE_API_BASE || "/api"}/messages${direction != null && id != null ? `?${direction}=${id}` : ""}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      set(() => ({
        messages: data.data,
        meta: data.meta,
        status: Status.Success,
        messageCursor:
          direction != null && id != null
            ? {
                origin: direction,
                id: id,
              }
            : cursorInitialState,
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
    get().fetchData(null, null);
  },

  fetchByCursor: async () => {
    const cursor = get().messageCursor;
    get().fetchData(cursor.id, cursor.origin);
  },

  fetchNext: async () => {
    const next = get().meta.next;

    if (next !== null && next !== "") {
      get().fetchData(get().meta.next, Pagination.Next);
      console.log(get().messageCursor);
    }
  },

  fetchPrev: async () => {
    const prev = get().meta.prev;

    if (prev !== null && prev !== "") {
      get().fetchData(get().meta.prev, Pagination.Prev);
      set((state) => ({
        ...state,
        cursor: {
          origin: Pagination.Prev,
          id: prev,
        },
      }));
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
      get().setPostDelay(null);
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

  setPostDelay: (seconds: number | null) => {
    set(() => ({
      postDelay: seconds,
    }));
  },
}));

export default useMessagesStore;
