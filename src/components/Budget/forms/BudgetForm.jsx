import ExploitationForm from "./ExploitationForm";
import InvestissementForm from "./InvestissementForm";
import MaintenanceForm from "./MaintenanceForm";
import FonctionnementForm from "./FonctionnementForm";
import ProjetForm from "./ProjetForm";
import MedicalForm from "./medicalform";
import SocialForm from "./SocialForm";

function BudgetForm({ type, setShowModal, onSuccess }) {
  const normalizedType = type?.toLowerCase();

  if (normalizedType === "exploitation")
    return <ExploitationForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "investissement")
    return <InvestissementForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "maintenance")
    return <MaintenanceForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "fonctionnement")
    return <FonctionnementForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "projets")
    return <ProjetForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "medical")
    return <MedicalForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  if (normalizedType === "social")
    return <SocialForm setShowModal={setShowModal} onSuccess={onSuccess} />;

  return null;
}

export default BudgetForm;
