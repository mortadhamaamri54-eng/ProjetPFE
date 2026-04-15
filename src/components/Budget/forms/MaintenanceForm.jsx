import { useState } from "react";
import API from "../../../api/api";

function MaintenanceForm({ setShowModal, onSuccess }) {
  const [form, setForm] = useState({ fournisseur: "", montant: "", objet: "", contact: "", dateDebut: "", dateFin: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.objet || !form.montant) {
      return alert("Merci de renseigner l'objet de la maintenance et le montant.");
    }

    try {
      const res = await API.post("/directeur", {
        type: "maintenance",
        title: form.objet
      });

      const budgetId = res.data._id;

      await API.post(`/directeur/${budgetId}/lignes`, {
        description: `${form.objet} - ${form.fournisseur}`,
        montant: Number(form.montant),
        categorie: "maintenance"
      });

      onSuccess?.();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du budget de maintenance.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#111827] p-6 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold">Nouveau budget de maintenance</h2>

        <input
          name="fournisseur"
          value={form.fournisseur}
          onChange={handleChange}
          placeholder="Fournisseur"
          className="w-full p-2 bg-slate-800 rounded text-white"
        />

        <input
          name="objet"
          value={form.objet}
          onChange={handleChange}
          placeholder="Objet de la maintenance"
          className="w-full p-2 bg-slate-800 rounded text-white"
          required
        />

        <input
          name="montant"
          type="number"
          value={form.montant}
          onChange={handleChange}
          placeholder="Montant (TND)"
          className="w-full p-2 bg-slate-800 rounded text-white"
          required
        />

        <input
          name="contact"
          value={form.contact}
          onChange={handleChange}
          placeholder="Contact"
          className="w-full p-2 bg-slate-800 rounded text-white"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            name="dateDebut"
            type="date"
            value={form.dateDebut}
            onChange={handleChange}
            className="w-full p-2 bg-slate-800 rounded text-white"
          />
          <input
            name="dateFin"
            type="date"
            value={form.dateFin}
            onChange={handleChange}
            className="w-full p-2 bg-slate-800 rounded text-white"
          />
        </div>

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

export default MaintenanceForm;
