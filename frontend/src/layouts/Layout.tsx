import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Dashboard } from "../pages/Dashboard";

function Layout() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <Outlet />
    </div>
  );
}

export default Layout;
