function BudgetTable({ budgets, direction, types }) {

  const directionData = budgets[direction] || {};
  const allBudgets = Object.values(directionData).flat();

  const getValue = (type, year) => {
    return allBudgets
      .filter((b) => b.type === type && b.year === year)
      .reduce((acc, b) => acc + (b.montant || 0), 0);
  };

  const evolution = (a, b) => {
    if (!a) return 0;
    return (((b - a) / a) * 100).toFixed(1);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl">

      <h2 className="text-xl font-semibold mb-4">
        Budget Details
      </h2>

      <table className="w-full text-left">

        <thead className="text-gray-400">
          <tr>
            <th>Type</th>
            <th>2025</th>
            <th>2026</th>
            <th>Evolution</th>
          </tr>
        </thead>

        <tbody>
          {types.map((type) => {

            const v2025 = getValue(type, 2025);
            const v2026 = getValue(type, 2026);

            return (
              <tr key={type} className="border-t border-slate-700">

                <td className="capitalize">{type}</td>
                <td>{v2025}</td>
                <td>{v2026}</td>
                <td>
                  {evolution(v2025, v2026)} %
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}

export default BudgetTable;