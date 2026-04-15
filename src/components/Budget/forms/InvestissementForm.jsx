import { useState } from "react";
import API from "../../../api/api";

function InvestissementForm({ setShowModal, onSuccess }) {
  const [form, setForm] = useState({ projet: "", montant: "", justification: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.projet || !form.montant) {
      return alert("Merci de renseigner le projet et le montant.");
    }

    try {
      const res = await API.post("/directeur", {
        type: "investissement",
        title: form.projet
      });

      const budgetId = res.data._id;

      await API.post(`/directeur/${budgetId}/lignes`, {
        description: form.justification || form.projet,
        montant: Number(form.montant),
        categorie: "investissement"
      });

      onSuccess?.();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du budget d'investissement.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#111827] p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Nouveau budget d'investissement</h2>

        <input
          name="projet"
          value={form.projet}
          onChange={handleChange}
          placeholder="Nom du projet"
          className="w-full p-2 bg-slate-800 rounded text-white"
          required
        />

        <input
          name="montant"
          type="number"
          value={form.montant}
          onChange={handleChange}
          placeholder="Montant prévu (TND)"
          className="w-full p-2 bg-slate-800 rounded text-white"
          required
        />

        <textarea
          name="justification"
          value={form.justification}
          onChange={handleChange}
          placeholder="Justification / détails du projet"
          className="w-full p-2 bg-slate-800 rounded text-white"
          rows={3}
        />

        <div className="flex justify-end gap-3">
          <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded">
            Annuler
          </button>
          <button onClick={handleSubmit} className="bg-indigo-600 px-4 py-2 rounded">
            Enregistrer brouillon
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvestissementForm;
