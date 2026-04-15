import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";

import BudgetHeader from "../components/Budget/common/BudgetHeader";
import BudgetCards from "../components/Budget/common/BudgetCards";
import BudgetTable from "../components/Budget/common/BudgetTable";
import BudgetChart from "../components/Budget/common/BudgetChart";
import Modal from "../components/Budget/common/Modal";
import FonctionnementForm from "../components/Budget/forms/FonctionnementForm";
import MedicalForm from "../components/Budget/forms/medicalform";
import SocialForm from "../components/Budget/forms/SocialForm";
import ProjetForm from "../components/Budget/forms/ProjetForm";
import InvestissementForm from "../components/Budget/forms/InvestissementForm";
import MaintenanceForm from "../components/Budget/forms/MaintenanceForm";
import ExploitationForm from "../components/Budget/forms/ExploitationForm";

export default function BudgetTypePage() {

  const { type } = useParams();
  const { currentUser } = useContext(AuthContext);

  const [budgets, setBudgets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchBudgets = useCallback(async () => {
    try {
      const res = await API.get("/directeur/mes-budgets");

      setBudgets(res.data);

    } catch (error) {
      console.error("Erreur fetch budgets:", error);
    }
  }, []);

  useEffect(() => {
    if (currentUser) fetchBudgets();
  }, [type, currentUser, fetchBudgets]);

  const typeAliases = {
    juridique: "fonctionnement",
    contrats: "projets"
  };

  const normalizedType = type?.toLowerCase();
  const realType = typeAliases[normalizedType] || normalizedType;

  const data = budgets.filter(
    (b) => b.type?.toLowerCase() === realType
  );

  const total = data.reduce((acc, b) => acc + (b.total || 0), 0);
  const average = data.length > 0 ? Math.round(total / data.length) : 0;
  const statusCounts = data.reduce(
    (acc, b) => {
      const key = b.statut?.toLowerCase();
      if (key === "brouillon") acc.brouillon += 1;
      if (key === "soumis") acc.soumis += 1;
      if (key === "refusé" || key === "refuse" || key === "refused") acc.refuse += 1;
      return acc;
    },
    { brouillon: 0, soumis: 0, refuse: 0 }
  );

  const deleteBudget = async (id) => {
    try {
      await API.delete(`/directeur/${id}`);

      fetchBudgets();
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  // ✅ VERSION PRO (clean)
  const renderForm = () => {
    const props = {
      onSuccess: fetchBudgets,
      setShowModal,
    };

    const forms = {
      exploitation: <ExploitationForm {...props} />,
      investissement: <InvestissementForm {...props} />,
      maintenance: <MaintenanceForm {...props} />,
      fonctionnement: <FonctionnementForm {...props} />,
      medical: <MedicalForm {...props} />,
      social: <SocialForm {...props} />,
      projets: <ProjetForm {...props} />,
    };

    return forms[realType] || <p>Type invalide</p>;
  };

  const typeTitleMap = {
    juridique: "Juridique",
    contrats: "Contrats",
    fonctionnement: "Fonctionnement",
    projets: "Contentieux",
    exploitation: "Exploitation",
    investissement: "Investissement",
    maintenance: "Maintenance",
    medical: "Médical",
    social: "Social"
  };

  const pageTitle = typeTitleMap[normalizedType] ? `Budget ${typeTitleMap[normalizedType]}` : `Budget ${type}`;
  const addDisabled = !realType || !typeTitleMap[normalizedType];

  return (
    <div className="p-6 bg-[#0b1220] min-h-screen text-white space-y-6">

      <BudgetHeader
        title={pageTitle}
        onAdd={() => setShowModal(true)}
        disabled={addDisabled}
      />

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-6">
        <div className="space-y-6">
          <BudgetCards total={total} count={data.length} average={average} />
          <BudgetChart total={total} count={data.length} />
        </div>

        <div className="grid gap-4">
          <div className="bg-slate-800 rounded-3xl p-5 shadow-xl shadow-slate-900/20 border border-slate-700">
            <h3 className="text-lg font-semibold text-white">État des demandes</h3>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Brouillons</p>
                <p className="text-2xl font-bold text-white mt-2">{statusCounts.brouillon}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Soumis</p>
                <p className="text-2xl font-bold text-white mt-2">{statusCounts.soumis}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Refusés</p>
                <p className="text-2xl font-bold text-white mt-2">{statusCounts.refuse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BudgetTable
        data={data}
        onDelete={deleteBudget}
      />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {renderForm()}
        </Modal>
      )}

    </div>
  );
}