function AlertsPanel({ budgets, direction }) {
  const directionData = budgets[direction] || {};

  const directionBudgets = Object.values(directionData).flat();

  const alerts = [];

  if (directionBudgets.length === 0) {
    alerts.push({
      text: "Aucun budget soumis",
      color: "bg-yellow-500/20 text-yellow-400"
    });
  }

  if (directionBudgets.length > 5) {
    alerts.push({
      text: "Beaucoup de budgets soumis",
      color: "bg-blue-500/20 text-blue-400"
    });
  }

  const total = directionBudgets.reduce(
    (acc, b) => acc + (b.montant || 0),
    0
  );

  if (total > 50000) {
    alerts.push({
      text: "Budget élevé",
      color: "bg-red-500/20 text-red-400"
    });
  }

  return (
    <div className="bg-slate-800 p-6 rounded-xl space-y-4">

      <h2 className="font-semibold">Alertes</h2>

      {alerts.length === 0 && (
        <p className="text-gray-400">Aucune alerte</p>
      )}

      {alerts.map((a) => (
        <div key={a.text} className={`p-3 rounded-lg ${a.color}`}>
          {a.text}
        </div>
      ))}

    </div>
  );
}

export default AlertsPanel;