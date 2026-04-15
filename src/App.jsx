import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/layout/Layout";
import DashboardDirecteur from "./pages/DashboardDirecteur";
import BudgetTypePage from "./pages/BudgetTypePage";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Profile from "./pages/Profile";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<DashboardDirecteur />} />
        <Route path="di/:type" element={<BudgetTypePage />} />
        <Route path="rh/:type" element={<BudgetTypePage />} />
        <Route path="aj/:type" element={<BudgetTypePage />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;