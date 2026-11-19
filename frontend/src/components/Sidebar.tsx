import { Book, Users, BookOpen } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">MiniBiblio</h1>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg text-blue-300"
        >
          <Book size={20} /> Livres
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300"
        >
          <Users size={20} /> Membres
        </a>

        <a
          href="#"
          className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg text-slate-300"
        >
          <BookOpen size={20} /> Emprunts
        </a>
      </nav>
    </aside>
  );
};
