import API from "../api/api";

export const getBudgets = async () => {
  try {
    const res = await API.get("/directeur/mes-budgets");
    return res.data;
  } catch (error) {
    console.error("Erreur getBudgets:", error);
    throw error;
  }
};

export const createBudget = async (type) => {
  try {
    const res = await API.post("/directeur", { type });
    return res.data;
  } catch (error) {
    console.error("Erreur createBudget:", error);
    throw error;
  }
};

export const addLigne = async (budgetId, data) => {
  try {
    const res = await API.post(`/directeur/${budgetId}/lignes`, data);
    return res.data;
  } catch (error) {
    console.error("Erreur addLigne:", error);
    throw error;
  }
};

export const submitBudget = async (budgetId) => {
  try {
    const res = await API.put(`/directeur/${budgetId}/soumettre`);
    return res.data;
  } catch (error) {
    console.error("Erreur submitBudget:", error);
    throw error;
  }
};

export const formatStatus = (status) => {
  if (!status) return "Inconnu";
  const normalized = status.toString().toUpperCase();

  switch (normalized) {
    case "BROUILLON":
      return "Brouillon";
    case "SOUMIS":
      return "En attente";
    case "VALIDE":
      return "Validé";
    case "REJETE":
      return "Rejeté";
    default:
      return status;
  }
};
