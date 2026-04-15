function DashboardCards({ budgets }) {

  const totalBudget = budgets.reduce(
    (acc, b) => acc + (b.total || 0),
    0
  );

  const draftCount = budgets.filter(
    (b) => b.statut?.toLowerCase() === "brouillon"
  ).length;

  const submittedCount = budgets.filter(
    (b) => b.statut?.toLowerCase() === "soumis"
  ).length;

  const cards = [
    {
      title: "Montant total",
      value: `${totalBudget.toLocaleString()} TND`,
      color: "text-indigo-400"
    },
    {
      title: "Brouillons",
      value: draftCount,
      color: "text-yellow-400"
    },
    {
      title: "Soumis",
      value: submittedCount,
      color: "text-green-400"
    },
    {
      title: "Demandes totales",
      value: budgets.length,
      color: "text-red-400"
    }
  ];


  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((c) => (
        <div key={c.title} className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">{c.title}</p>
          <h2 className={`text-2xl font-bold ${c.color}`}>
            {c.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
export default DashboardCards;