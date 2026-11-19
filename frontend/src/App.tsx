import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="flex bg-slate-50">
      <Sidebar />
      <Dashboard />
    </div>
  );
}

export default App;
