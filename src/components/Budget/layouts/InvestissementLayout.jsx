import BudgetHeader from "../common/BudgetHeader";
import BudgetCards from "../common/BudgetCards";
import BudgetChart from "../common/BudgetChart";
import BudgetTable from "../common/BudgetTable";
import BudgetForm from "../forms/BudgetForm";

function InvestissementLayout({ type }) {

  return (
    <div className="p-8 text-white">

      <BudgetHeader title={type} />

      <BudgetCards />

      <BudgetChart />

      <BudgetForm type={type} />

      <BudgetTable />

    </div>
  );
}

export default InvestissementLayout;