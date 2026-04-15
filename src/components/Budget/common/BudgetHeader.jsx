export default function BudgetHeader({ title, onAdd, disabled }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-2xl">
          Gérez vos demandes de budget, suivez les brouillons et visualisez l&apos;état global avec un tableau clair.
        </p>
      </div>

      <button
        onClick={onAdd}
        disabled={disabled}
        className={`px-5 py-3 rounded-xl font-semibold transition ${disabled ? "bg-slate-600 text-slate-300 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-500"}`}
      >
        + Ajouter
      </button>
    </div>
  );
}
