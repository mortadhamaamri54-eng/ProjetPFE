import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BudgetContext } from "../context/BudgetContext";

import KPICards from "../components/Statistics/KPICards";
import BudgetCharts from "../components/Statistics/BudgetCharts";
import BudgetTable from "../components/Statistics/BudgetTable";

function Statistics() {

  const { currentUser } = useContext(AuthContext);
  const { budgets } = useContext(BudgetContext);

  const direction = currentUser?.direction?.code;

  const statsConfig = {
    DI: ["exploitation", "investissement", "maintenance"],
    RH: ["fonctionnement", "medical", "social", "projets"],
    AJ: ["fonctionnement", "projets"]
  };

  const types = statsConfig[direction] || [];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Statistics Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Direction : {direction}
        </p>
      </div>

      <KPICards
        budgets={budgets}
        direction={direction}
      />

      <BudgetCharts
        budgets={budgets}
        direction={direction}
        types={types}
      />


      <BudgetTable
        budgets={budgets}
        direction={direction}
        types={types}
      />

    </div>
  );
}

export default Statistics;