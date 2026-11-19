import { Routes, Route } from "react-router";
import Layout from "./layouts/Layout";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
