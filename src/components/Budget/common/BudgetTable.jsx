import { formatStatus } from "../../../services/budgetService";

export default function BudgetTable({ data = [], onDelete }) {
  return (
    <div className="bg-slate-800 rounded-3xl p-5 mt-6 shadow-xl shadow-slate-900/20 border border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Historique des budgets</h3>
        <span className="text-sm text-slate-400">{data.length} éléments</span>
      </div>

      {data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-slate-400">
          Aucune demande de budget pour cette catégorie.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="text-left text-slate-400 text-sm uppercase tracking-wide">
                <th className="py-3">ID</th>
                <th className="py-3">Type</th>
                <th className="py-3">Total</th>
                <th className="py-3">Statut</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item._id || item.id} className="border-t border-slate-700">
                  <td className="py-4 text-sm text-slate-300">{String(item._id || item.id).slice(0, 8)}</td>
                  <td className="py-4 text-sm text-slate-200">{item.type || item.description || "—"}</td>
                  <td className="py-4 text-sm text-slate-200">{item.total ?? item.montant ?? 0} TND</td>
                  <td className="py-4">
                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-slate-700 text-slate-300">
                      {formatStatus(item.statut)}
                    </span>
                  </td>
                  <td className="py-4">
                    {onDelete ? (
                      <button
                        onClick={() => onDelete(item._id || item.id)}
                        className="rounded-full border border-red-500 px-3 py-1 text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        Supprimer
                      </button>
                    ) : (
                      <span className="text-slate-500 text-sm">Aucun</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
