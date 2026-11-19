import { useEffect } from "react";
import { useBookStore } from "../store/useBookStore";
import { Book } from "lucide-react";

export const Dashboard = () => {
  const { books, isLoading, error, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="flex-1 p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Catalogue des Livres
        </h2>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          + Ajouter un livre
        </button>
      </div>

      {/* Gestion des erreurs */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Gestion du chargement */}
      {isLoading ? (
        <div className="text-center py-10 text-slate-500">
          Chargement des livres...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.length === 0 ? (
            <p className="text-slate-500">Aucun livre dans la bibliothèque.</p>
          ) : (
            books.map((book) => (
              <div
                key={book.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-slate-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Book size={24} />
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      book.available_copies > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.available_copies} dispo
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  {book.title}
                </h3>

                <p className="text-sm text-slate-500 mb-4">{book.author}</p>
                <div className="text-xs text-slate-400">ISBN: {book.isbn}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
