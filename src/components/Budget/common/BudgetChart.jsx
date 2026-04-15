export default function BudgetChart({ total, count }) {
  const progress = count > 0 ? Math.min((total / (count * 5000)) * 100, 100) : 0;
  const label = count > 0 ? `${progress.toFixed(0)}% de l'objectif` : "Aucune donnée";

  return (
    <div className="bg-slate-800 p-6 rounded-3xl mt-6 shadow-xl shadow-slate-900/20 border border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-white text-xl font-semibold">Performance du budget</h3>
          <p className="text-slate-400 mt-2 max-w-xl">Suivez le rythme de vos demandes et le niveau d'activité de la direction.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Total</p>
          <p className="text-2xl font-bold text-white">{total} TND</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-4 rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-3 text-sm text-slate-300">{label}</p>
      </div>
    </div>
  );
}
