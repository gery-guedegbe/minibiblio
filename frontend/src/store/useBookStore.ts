import { create } from "zustand";
import { api } from "../api/axios";
import type { Book } from "../types/types";

interface BookState {
  books: Book[];
  isLoading: boolean;
  error: string | null;
  fetchBooks: () => Promise<void>;
  addBook: (bookData: Omit<Book, "id" | "available_copies">) => Promise<void>;
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
      const message =
        err.response?.data?.error || "Erreur de connexion au serveur";
      set({ error: message, isLoading: false });
    }
  },

  addBook: async (bookData) => {
    try {
      const response = await api.post<Book>("/books", bookData);

      set((state) => ({ books: [response.data, ...state.books] }));
    } catch (err: any) {
      throw new Error(err.response?.data?.error || "Erreur lors de l'ajout");
    }
  },
}));
