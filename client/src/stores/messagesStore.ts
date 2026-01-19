import { create } from "zustand";

interface MessageState {
  title: string;
  body: string;
}

const useMessagesStore = create((set) => ({
  count: 0,
  inc: () =>
    set((state: { count: number }) => ({
      count: state.count + 1,
    })),
}));

export default useMessagesStore;
