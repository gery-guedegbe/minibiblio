import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";
import { LoansPage } from "./pages/LoansPage";
import MembersPage from "./pages/MembersPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="loans" element={<LoansPage />} />
        <Route path="members" element={<MembersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
