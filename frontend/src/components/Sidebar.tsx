import { Book, Users, BookOpen } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-lg transition ${
      isActive
        ? "bg-slate-800 text-blue-300 font-medium"
        : "hover:bg-slate-800 text-slate-300 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 shrink-0">
      <h1 className="text-2xl font-bold mb-8 text-blue-400 px-3">MiniBiblio</h1>

      <nav className="space-y-2">
        <NavLink to="/" end className={linkClass}>
          <Book size={20} /> Livres
        </NavLink>

        <NavLink to="/members" className={linkClass}>
          <Users size={20} /> Membres
        </NavLink>

        <NavLink to="/loans" className={linkClass}>
          <BookOpen size={20} /> Emprunts
        </NavLink>
      </nav>
    </aside>
  );
};
