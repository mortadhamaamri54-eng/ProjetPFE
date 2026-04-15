function InvestmentTable({ data, setData }) {

  const deleteItem = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="card p-6">

      <table className="w-full">

        <thead className="text-gray-400">
          <tr>
            <th>Projet</th>
            <th>Budget</th>
            <th>Dépense</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => {

            const taux = ((item.depense / item.budget) * 100).toFixed(0);

            return (
              <tr key={item.projet} className="border-t border-gray-700 hover:bg-slate-800">

                <td className="py-3">{item.projet}</td>
                <td>{item.budget.toLocaleString()} DA</td>
                <td>{item.depense.toLocaleString()} DA</td>

                <td>
                  <span className={`px-2 py-1 rounded text-sm
                    ${
                      item.statut === "Terminé"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                    {item.statut}
                  </span>
                </td>

                <td className="space-x-3">
                  <button className="text-blue-400">✏️</button>
                  <button
                    onClick={() => deleteItem(i)}
                    className="text-red-400"
                  >
                    🗑
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>

      </table>

    </div>
  );
}

export default InvestmentTable;