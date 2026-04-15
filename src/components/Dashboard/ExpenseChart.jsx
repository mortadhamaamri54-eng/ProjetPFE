import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

function ExpenseChart({ budgets, direction }) {

  const months = ["Jan", "Fév", "Mar", "Avr"];

  const directionData = budgets[direction] || {};

  const allBudgets = Object.values(directionData).flat();

  const data = months.map((m) => {

    const total = allBudgets.reduce(
      (acc, b) => acc + (b.montant || 0),
      0
    );

    return {
      name: m,
      prevu: total / 4,
      realise: (total / 4) * 0.8
    };
  });

  return (
    <div className="bg-slate-800 p-6 rounded-xl">

      <h2 className="mb-4 font-semibold">
        Dépenses mensuelles
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#1f2937" />
          <XAxis dataKey="name" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />

          <Bar dataKey="prevu" fill="#818cf8" />
          <Bar dataKey="realise" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ExpenseChart;