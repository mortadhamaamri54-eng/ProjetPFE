import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function InvestmentChart({ data }) {

  return (
    <div className="card p-6">

      <h2 className="mb-4 font-semibold">
        Suivi des investissements
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          <XAxis dataKey="projet" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />

          <Bar dataKey="budget" fill="#818cf8" />
          <Bar dataKey="depense" fill="#22c55e" />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default InvestmentChart;