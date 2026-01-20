import { create } from "zustand";

interface ErrorsState {
  errors: String[];
  pushError: (message: String) => void;
  shiftError: () => void;
  clearErrors: () => void;
  clearSetError: (message: String) => void;
}

const initialErrorsState: ErrorsState = {
  errors: [],
  pushError: (message: String) => {},
  shiftError: () => {},
  clearErrors: () => {},
  clearSetError: (message: String) => {},
};

const useErrorsStore = create<ErrorsState>()((set, get) => ({
  ...initialErrorsState,
  clearSetError: (message: String): void => {
    set(() => ({
      errors: [message],
    }));
  },
  pushError: (message: String): void => {
    set((state) => ({
      errors: [...state.errors, message],
    }));
  },
  shiftError: (): String | undefined => {
    return get().errors.shift();
  },
  clearErrors: (): void => {
    set((state) => ({
      errors: [],
    }));
  },
}));

export default useErrorsStore;
