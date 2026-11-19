import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";

function Layout() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default Layout;
