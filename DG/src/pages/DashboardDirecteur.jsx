import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import DashboardCards from "../components/Dashboard/DashboardCards";
import ExpenseChart from "../components/Dashboard/ExpenseChart";
import BudgetOverview from "../components/Dashboard/BudgetOverview";
import AlertsPanel from "../components/Dashboard/AlertsPanel";

function DashboardDirecteur() {

  const { currentUser } = useContext(AuthContext);

  const [budgets, setBudgets] = useState([]);

  const direction = currentUser?.direction?.code;

  const config = {
    DI: ["exploitation", "investissement", "maintenance"],
    RH: ["fonctionnement", "medical", "social", "projets"],
    AJ: ["fonctionnement", "projets"]
  };

  const types = config[direction] || [];

  const fetchBudgets = useCallback(async () => {
  try {
    const res = await API.get("/directeur/mes-budgets");

    console.log("BUDGETS =", res.data);

    setBudgets(res.data); 

  } catch (error) {
    console.error("Erreur fetch budgets", error);
  }
}, []);

  useEffect(() => {
    if (currentUser) {
      fetchBudgets();
    }
  }, [currentUser, fetchBudgets]);

  const totalAmount = budgets.reduce((acc, b) => acc + (b.total || 0), 0);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 space-y-8">

      <DashboardHeader />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-900/20 border border-slate-700">
          <p className="text-sm text-slate-400">Montant total des demandes</p>
          <p className="mt-4 text-3xl font-bold text-white">{totalAmount.toLocaleString()} TND</p>
          <p className="mt-2 text-sm text-slate-500">Les budgets sont actuellement en statut brouillon</p>
        </div>
      </div>

      <DashboardCards budgets={budgets} />

      <div className="grid grid-cols-2 gap-6">
        <ExpenseChart budgets={budgets} direction={direction} />
        <AlertsPanel budgets={budgets} direction={direction} />
      </div>

      <BudgetOverview
    budgets={budgets}
    direction={direction}
    types={types}
    refreshBudgets={fetchBudgets}
/>
    </div>
  );
}

export default DashboardDirecteur;