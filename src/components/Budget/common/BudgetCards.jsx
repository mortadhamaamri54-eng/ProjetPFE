export default function BudgetCards({ total, count, average }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-slate-800 p-5 rounded-3xl shadow-lg shadow-slate-900/20 border border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">Total budget</p>
        <h2 className="text-3xl font-bold text-white mt-3">{total} TND</h2>
        <p className="text-slate-400 mt-2 text-sm">Somme de toutes les demandes affichées.</p>
      </div>

      <div className="bg-slate-800 p-5 rounded-3xl shadow-lg shadow-slate-900/20 border border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">Demandes</p>
        <h2 className="text-3xl font-bold text-white mt-3">{count}</h2>
        <p className="text-slate-400 mt-2 text-sm">Nombre de budgets créés pour cette vue.</p>
      </div>

      <div className="bg-slate-800 p-5 rounded-3xl shadow-lg shadow-slate-900/20 border border-slate-700">
        <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">Moyenne</p>
        <h2 className="text-3xl font-bold text-white mt-3">{average} TND</h2>
        <p className="text-slate-400 mt-2 text-sm">Montant moyen par budget.</p>
      </div>
    </div>
  );
}
