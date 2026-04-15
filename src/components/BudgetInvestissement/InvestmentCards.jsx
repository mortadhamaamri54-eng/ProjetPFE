function InvestmentCards({ totalBudget, totalDepense }) {

  const taux = ((totalDepense / totalBudget) * 100).toFixed(0);

  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="card p-6">
        <p className="text-gray-400">Budget Total</p>
        <h2 className="text-2xl font-bold text-indigo-400">
          {(totalBudget / 1000000).toFixed(1)}M DNT
        </h2>
      </div>

      <div className="card p-6">
        <p className="text-gray-400">Dépenses</p>
        <h2 className="text-2xl font-bold text-green-400">
          {(totalDepense / 1000000).toFixed(1)}M DNT
        </h2>
      </div>

      <div className="card p-6">
        <p className="text-gray-400">Progression</p>
        <h2 className="text-2xl font-bold text-yellow-400">
          {taux}%
        </h2>
      </div>

    </div>
  );
}

export default InvestmentCards;