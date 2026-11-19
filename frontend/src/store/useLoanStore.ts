import { create } from "zustand";
import { api } from "../api/axios";

interface LoanState {
  isLoading: boolean;
  error: string | null;
  createLoan: (memberId: number, bookId: number) => Promise<boolean>;
}

export const useLoanStore = create<LoanState>((set) => ({
  isLoading: false,
  error: null,

  createLoan: async (memberId, bookId) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/loans", { member_id: memberId, book_id: bookId });
      set({ isLoading: false });
      return true; // Succès
    } catch (err: any) {
      const message = err.response?.data?.error || "Erreur lors de l'emprunt";
      set({ error: message, isLoading: false });
      return false; // Échec
    }
  },
}));
