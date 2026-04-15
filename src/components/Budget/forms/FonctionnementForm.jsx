import { useState } from "react";
import API from "../../../api/api";

export default function FonctionnementForm({ setShowModal, onSuccess }) {
  const [form, setForm] = useState({ description: "", montant: "", poste: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.description || !form.montant) {
      return alert("Merci de renseigner la description et le montant.");
    }

    try {
      const res = await API.post("/directeur", {
        type: "fonctionnement",
        title: form.poste || form.description
      });

      const budgetId = res.data._id;

      await API.post(`/directeur/${budgetId}/lignes`, {
        description: form.description,
        montant: Number(form.montant),
        categorie: "fonctionnement"
      });

      onSuccess?.();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du budget de fonctionnement.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-white">
      <h2 className="text-xl font-bold">Nouveau budget de fonctionnement</h2>

      <input
        name="poste"
        placeholder="Poste de dépense"
        value={form.poste}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white"
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white"
        required
      />

      <input
        type="number"
        name="montant"
        placeholder="Montant (TND)"
        value={form.montant}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 text-white"
        required
      />

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2 rounded text-white">
          Annuler
        </button>
        <button type="submit" className="bg-indigo-600 px-4 py-2 rounded text-white">
          Enregistrer brouillon
        </button>
      </div>
    </form>
  );
}
