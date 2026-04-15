import Budget from "../../models/Budget";

export const createBudget = async (directionId: string, type: string) => {
  const budget = new Budget({
    direction: directionId,
    type,
    lignes: [],
    total: 0,
    statut: "BROUILLON",
    dateCreation: new Date()
  });

  return await budget.save();
};

export const addLigne = async (budgetId: string, data: any) => {
  const budget = await Budget.findById(budgetId);

  if (!budget) {
    throw new Error("Budget introuvable");
  }

  if (!data.description || !data.montant || !data.categorie) {
    throw new Error("Champs manquants");
  }

  budget.lignes.push({
    description: data.description,
    montant: data.montant,
    categorie: data.categorie,
    creePar: data.creePar
  });

  budget.total = budget.lignes.reduce(
    (sum: number, l: any) => sum + l.montant,
    0
  );

  return await budget.save();
};

export const submitBudget = async (budgetId: string) => {
  const budget = await Budget.findById(budgetId);

  if (!budget) {
    throw new Error("Budget introuvable");
  }

  if (budget.total === 0) {
    throw new Error("Budget vide");
  }

  budget.statut = "SOUMIS";

  return await budget.save();
};

export const getBudgetsByDirection = async (directionId: string) => {
  return await Budget.find({ direction: directionId });
};