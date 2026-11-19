import { useEffect, useState } from "react";
import { useLoanStore } from "../store/useLoanStore";
import { BookOpen, AlertCircle } from "lucide-react";

export const LoansPage = () => {
  const { loans, isLoading, error, fetchActiveLoans } = useLoanStore();
  const [filterMember, setFilterMember] = useState<string>("");

  useEffect(() => {
    // Si un membre est sélectionné, on filtre, sinon on récupère tout
    fetchActiveLoans(filterMember ? Number(filterMember) : undefined);
  }, [fetchActiveLoans, filterMember]);

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Emprunts en cours</h2>

        {/* Filtre par membre */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-600">
            Filtrer par membre :
          </label>

          <select
            value={filterMember}
            onChange={(e) => setFilterMember(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="">Tous les membres</option>
            <option value="1">Alice</option>
            <option value="2">Bob</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10 text-slate-500">
          Chargement des emprunts...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-sm">
                <th className="p-4 font-semibold">Livre</th>
                <th className="p-4 font-semibold">Membre</th>
                <th className="p-4 font-semibold">Date d'emprunt</th>
                <th className="p-4 font-semibold">Retour prévu</th>
                <th className="p-4 font-semibold">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Aucun emprunt en cours.
                  </td>
                </tr>
              ) : (
                loans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-slate-50 transition">
                    <td className="p-4">
                      <div className="font-medium text-slate-800">
                        {loan.book_title}
                      </div>
                      <div className="text-xs text-slate-500">
                        {loan.book_author}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-800">
                        {loan.member_name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {loan.member_email}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(loan.loan_date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(loan.due_date).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="p-4">
                      {loan.is_overdue ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                          <AlertCircle size={14} /> En retard
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          <BookOpen size={14} /> À jour
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
