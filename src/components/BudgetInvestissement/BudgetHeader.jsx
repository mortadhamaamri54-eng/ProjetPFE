function BudgetHeader({ setShowModal }) {

  return (
    <div className="flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold">
          Budget Investissement
        </h1>
        <p className="text-gray-400">
          Projets & investissements IT
        </p>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-500 transition"
      >
        + Nouveau projet
      </button>

    </div>
  );
}

export default BudgetHeader;