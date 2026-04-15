import Budget from "../models/Budget";
import Ligne from "../models/Ligne";

export const createBudget = async (directionId: string, type: string) => {
  const budget = await Budget.create({
    directeur: directionId,
    type
  });

  return budget;
};

export const addLigne = async (budgetId: string, data: any) => {
  const budget = await Budget.findById(budgetId);

  if (!budget) {
    throw new Error("Budget introuvable");
  }

  const ligne = await Ligne.create({
    budget: budget._id,
    description: data.description,
    montant: data.montant
  });

  budget.lignes.push(ligne._id);
  budget.total = (budget.total || 0) + Number(data.montant);
  await budget.save();

  return budget;
};

export const submitBudget = async (budgetId: string) => {
  const budget = await Budget.findById(budgetId);

  if (!budget) throw new Error("Budget introuvable");

  if (budget.total === 0) {
    throw new Error("Budget vide");
  }

  budget.statut = "soumis";
  await budget.save();

  return budget;
};

export const getBudgetsByDirection = async (directionId: string) => {
  return await Budget.find({ directeur: directionId });
};