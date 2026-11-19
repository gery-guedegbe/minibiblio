import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBookStore } from "../store/useBookStore";
import { X } from "lucide-react";
import { useState } from "react";

// Définition du schéma de validation Zod
const bookSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  author: z.string().min(1, "L'auteur est requis"),
  isbn: z.string().min(10, "L'ISBN doit contenir au moins 10 caractères"),
  total_copies: z.number().min(1, "Il faut au moins 1 exemplaire"),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddBookModal = ({ isOpen, onClose }: AddBookModalProps) => {
  const { addBook } = useBookStore();
  const [apiError, setApiError] = useState<string | null>(null);

  // Initialisation de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: { total_copies: 1 },
  });

  const onSubmit = async (data: BookFormValues) => {
    try {
      setApiError(null);
      await addBook(data);
      reset();
      onClose();
    } catch (err: any) {
      setApiError(err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header du Modal */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Ajouter un livre</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Corps du Modal */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {apiError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {apiError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Titre
            </label>

            <input
              {...register("title")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Auteur
            </label>

            <input
              {...register("author")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.author && (
              <p className="text-red-500 text-xs mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              ISBN
            </label>

            <input
              {...register("isbn")}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.isbn && (
              <p className="text-red-500 text-xs mt-1">{errors.isbn.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre d'exemplaires
            </label>

            <input
              type="number"
              {...register("total_copies", { valueAsNumber: true })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {errors.total_copies && (
              <p className="text-red-500 text-xs mt-1">
                {errors.total_copies.message}
              </p>
            )}
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
            >
              Annuler
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition disabled:opacity-50"
            >
              {isSubmitting ? "Ajout..." : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
