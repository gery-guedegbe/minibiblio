import { useState } from "react";
import { X, BookOpen } from "lucide-react";
import type { Book } from "../types/types";
import { useLoanStore } from "../store/useLoanStore";

interface BorrowModalProps {
  book: Book | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const BorrowModal = ({ book, onClose, onSuccess }: BorrowModalProps) => {
  const { createLoan, isLoading, error } = useLoanStore();
  const [selectedMember, setSelectedMember] = useState<string>("1");

  if (!book) return null;

  const handleBorrow = async () => {
    const success = await createLoan(Number(selectedMember), book.id);
    if (success) {
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-600" /> Emprunter
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-4">
          Vous allez emprunter <strong>{book.title}</strong> pour une durée de
          14 jours.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Sélectionner le membre
          </label>

          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="1">Alice</option>
            <option value="2">Bob</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium"
          >
            Annuler
          </button>

          <button
            onClick={handleBorrow}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? "Traitement..." : "Confirmer"}
          </button>
        </div>
      </div>
    </div>
  );
};
