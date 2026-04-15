import { addLigne, submitBudget, formatStatus } from "../../services/budgetService";

function BudgetOverview({ budgets, refreshBudgets }) {

  const handleAddLigne = async (budgetId) => {
    try {
      await addLigne(budgetId, {
        description: "Achat matériel",
        montant: 5000,
        categorie: "IT"
      });

      refreshBudgets();

    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (budgetId) => {
    try {
      await submitBudget(budgetId);
      refreshBudgets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4">

      {budgets.map((b) => (
        <div key={b._id} className="bg-slate-800 p-4 rounded">

          <h3 className="text-lg font-bold">{b.type}</h3>

          <p>Total: {b.total} TND</p>

          <p>{formatStatus(b.statut)}</p>

          <button
            onClick={() => handleAddLigne(b._id)}
            className="mt-2 bg-green-500 px-3 py-1 rounded"
          >
            Ajouter Ligne
          </button>

          {b.statut?.toLowerCase() === "brouillon" && (
            <button
              onClick={() => handleSubmit(b._id)}
              className="mt-2 bg-blue-500 px-3 py-1 rounded"
            >
              Soumettre
            </button>
          )}

        </div>
      ))}

    </div>
  );
}

export default BudgetOverview;