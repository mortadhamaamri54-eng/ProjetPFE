import { useState } from "react";

function AddContractModal({ setShowModal, addContract }) {

  const [fournisseur, setFournisseur] = useState("");
  const [montant, setMontant] = useState("");
  const [objet, setObjet] = useState("");
  const [contact, setContact] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const handleSubmit = () => {

    const newContract = {
      fournisseur,
      montant: Number(montant),
      objet,
      contact,
      debut: dateDebut,
      fin: dateFin,
      statut: "Actif"
    };

    addContract(newContract);

    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">

      <div className="bg-[#111827] p-6 rounded-xl w-96 space-y-4">

        <h2 className="text-xl font-bold">
          Nouveau Contrat
        </h2>

        <input
          placeholder="Fournisseur"
          className="w-full p-2 bg-slate-800 rounded"
          value={fournisseur}
          onChange={(e) => setFournisseur(e.target.value)}
        />

        <input
          type="number"
          placeholder="Montant (DA)"
          className="w-full p-2 bg-slate-800 rounded"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
        />

        <input
          placeholder="Objet du contrat"
          className="w-full p-2 bg-slate-800 rounded"
          value={objet}
          onChange={(e) => setObjet(e.target.value)}
        />

        <input
          placeholder="Contact"
          className="w-full p-2 bg-slate-800 rounded"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 bg-slate-800 rounded"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-2 bg-slate-800 rounded"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
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
            Enregistrer
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddContractModal;