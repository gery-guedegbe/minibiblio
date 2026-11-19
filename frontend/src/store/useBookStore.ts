import { create } from "zustand";
import { api } from "../api/axios";
import type { Book } from "../types/types";

interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
}

export const useBookStore = create<BookState>((set) => ({
  books: [],
  isLoading: false,
  error: null,

  fetchBooks: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Book[]>("/books");
      set({ books: response.data, isLoading: false });
    } catch (err: any) {
      // On récupère le message d'erreur renvoyé par le backend
      const message =
        err.response?.data?.error || "Erreur de connexion au serveur";
      set({ error: message, isLoading: false });
    }
  },
}));
