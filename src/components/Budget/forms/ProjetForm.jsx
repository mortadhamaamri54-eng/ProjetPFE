import { useState } from "react";
import API from "../../../api/api";

export default function ProjetForm({ setShowModal, onSuccess }) {
  const [form, setForm] = useState({ nomProjet: "", budget: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nomProjet || !form.budget) {
      return alert("Merci de renseigner le nom du projet et le budget.");
    }

    try {
      const res = await API.post("/directeur", {
        type: "projets",
        title: form.nomProjet
      });

      const budgetId = res.data._id;

      await API.post(`/directeur/${budgetId}/lignes`, {
        description: form.description || form.nomProjet,
        montant: Number(form.budget),
        categorie: "projets"
      });

      onSuccess?.();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du budget de projet.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 text-white">
      <h2 className="text-xl font-bold">Nouveau Projet</h2>

      <input
        type="text"
        name="nomProjet"
        placeholder="Nom du projet"
        value={form.nomProjet}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-700 text-white"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-700 text-white"
      />

      <input
        type="number"
        name="budget"
        placeholder="Budget (TND)"
        value={form.budget}
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
