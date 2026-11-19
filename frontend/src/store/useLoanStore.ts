import { create } from "zustand";
import { api } from "../api/axios";
import type { Loan } from "../types/types";

interface LoanState {
  loans: Loan[];
  isLoading: boolean;
  error: string | null;
  fetchActiveLoans: (memberId?: number) => Promise<void>;
  createLoan: (memberId: number, bookId: number) => Promise<boolean>;
}

export const useLoanStore = create<LoanState>((set) => ({
  loans: [],
  isLoading: false,
  error: null,

  fetchActiveLoans: async (memberId) => {
    set({ isLoading: true, error: null });
    try {
      const url = memberId
        ? `/loans/active?member_id=${memberId}`
        : "/loans/active";
      const response = await api.get<Loan[]>(url);
      set({ loans: response.data, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.error || "Erreur de chargement des emprunts";
      set({ error: message, isLoading: false });
    }
  },

  createLoan: async (memberId, bookId) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/loans", { member_id: memberId, book_id: bookId });
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      const message = err.response?.data?.error || "Erreur lors de l'emprunt";
      set({ error: message, isLoading: false });
      return false;
    }
  },
}));
