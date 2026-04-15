function KPICards({ budgets, direction }) {

  const directionData = budgets[direction] || {};
  const allBudgets = Object.values(directionData).flat();

  const filterByYear = (year) =>
    allBudgets.filter((b) => b.year === year);

  const sum = (list) =>
    list.reduce((acc, b) => acc + (b.montant || 0), 0);

  const total2025 = sum(filterByYear(2025));
  const total2026 = sum(filterByYear(2026));

  const evolution =
    total2025 === 0
      ? 0
      : (((total2026 - total2025) / total2025) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Budget 2025</p>
        <h2 className="text-2xl font-bold">
          {total2025} TND
        </h2>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Budget 2026</p>
        <h2 className="text-2xl font-bold">
          {total2026} TND
        </h2>
      </div>

      <div className="bg-slate-800 p-6 rounded-xl">
        <p className="text-gray-400">Évolution</p>
        <h2
          className={`text-2xl font-bold ${
            evolution >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          {evolution} %
        </h2>
      </div>

    </div>
  );
}

export default KPICards;