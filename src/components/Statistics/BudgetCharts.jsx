import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

function BudgetCharts({ budgets, direction, types }) {



const directionData = budgets[direction] || {};
const allBudgets = Object.values(directionData).flat();

const getValue = (type, year) => {
  return allBudgets
    .filter((b) => b.type === type && b.year === year)
    .reduce((acc, b) => acc + (b.montant || 0), 0);
};

  const categoryTotals = types.map((type) => ({
    name: type,
    "2025": getValue(type, 2025),
    "2026": getValue(type, 2026)
  }));

  // 🔥 PIE 2026
  const pieData = categoryTotals.map((c) => ({
    name: c.name,
    value: c["2026"]
  }));

  const total2025 = categoryTotals.reduce((a, b) => a + b["2025"], 0);
  const total2026 = categoryTotals.reduce((a, b) => a + b["2026"], 0);

  const evolutionData = [
    { year: "2025", budget: total2025 },
    { year: "2026", budget: total2026 }
  ];

  return (
    <div className="space-y-8">

      <div className="bg-slate-800 p-6 rounded-xl">
        <h2 className="mb-4">Budget Evolution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={evolutionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="year" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="budget"
              stroke="#6366f1"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="mb-4">Répartition 2026</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={120}>
                {pieData.map((item, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="mb-4">Comparaison</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryTotals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />

              <Bar dataKey="2025" fill="#6366f1" />
              <Bar dataKey="2026" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default BudgetCharts;