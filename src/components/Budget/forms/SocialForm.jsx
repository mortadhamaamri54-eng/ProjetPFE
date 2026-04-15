import { useState } from "react";
import API from "../../../api/api";

export default function SocialForm({ setShowModal, onSuccess }) {
  const [form, setForm] = useState({ type: "aide", beneficiaire: "", montant: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.beneficiaire || !form.montant) {
      return alert("Merci de renseigner le bénéficiaire et le montant.");
    }

    try {
      const res = await API.post("/directeur", {
        type: "social",
        title: `${form.type} pour ${form.beneficiaire}`
      });

      const budgetId = res.data._id;

      await API.post(`/directeur/${budgetId}/lignes`, {
        description: `${form.type} - ${form.beneficiaire}`,
        montant: Number(form.montant),
        categorie: "social"
      });

      onSuccess?.();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du budget social.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white">
      <h2 className="text-xl font-bold">Demande Sociale</h2>

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-700 text-white"
      >
        <option value="aide">Aide</option>
        <option value="don">Don</option>
        <option value="evenement">Événement</option>
      </select>

      <input
        type="text"
        name="beneficiaire"
        placeholder="Bénéficiaire"
        value={form.beneficiaire}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-700 text-white"
        required
      />

      <input
        type="number"
        name="montant"
        placeholder="Montant (TND)"
        value={form.montant}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-700 text-white"
        required
      />

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-500 rounded-xl text-white">
          Annuler
        </button>

        <button type="submit" className="px-4 py-2 bg-indigo-600 rounded-xl text-white">
          Enregistrer brouillon
        </button>
      </div>
    </form>
  );
}
