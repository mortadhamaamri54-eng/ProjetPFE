import { useState } from "react";

function AddInvestmentModal({ setShowModal, addInvestment }) {

  const [projet, setProjet] = useState("");
  const [budget, setBudget] = useState("");
  const [depense, setDepense] = useState("");

  const handleSubmit = () => {

    addInvestment({
      projet,
      budget: Number(budget),
      depense: Number(depense),
      statut: "En cours"
    });

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-[#111827] p-6 rounded-xl w-96 space-y-4">

        <h2 className="text-xl font-bold">
          Nouveau projet
        </h2>

        <input
          placeholder="Nom du projet"
          className="w-full p-2 bg-slate-800 rounded"
          onChange={(e) => setProjet(e.target.value)}
        />

        <input
          type="number"
          placeholder="Budget"
          className="w-full p-2 bg-slate-800 rounded"
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Dépense"
          className="w-full p-2 bg-slate-800 rounded"
          onChange={(e) => setDepense(e.target.value)}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            Annuler
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 px-4 py-2 rounded"
          >
            Ajouter
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddInvestmentModal;