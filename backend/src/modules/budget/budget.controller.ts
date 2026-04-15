import { Request, Response } from "express";
import * as BudgetService from "../../services/budget.service";

interface AuthRequest extends Request {
  user?: {
    _id: string;
    direction: string;
  };
}

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { type } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Le type est requis" });
    }

    if (!req.user?.direction) {
      return res.status(401).json({ message: "Utilisateur non autorisé ou direction manquante" });
    }

    const budget = await BudgetService.createBudget(
      req.user.direction,
      type
    );

    return res.status(201).json(budget);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const addLigne = async (req: AuthRequest, res: Response) => {
  try {
    const budgetId = Array.isArray(req.params.budgetId)
      ? req.params.budgetId[0]
      : req.params.budgetId;
    const { description, montant, categorie } = req.body;

    if (!montant || isNaN(Number(montant))) {
      return res.status(400).json({ message: "Montant invalide" });
    }

    const ligneData = {
      description,
      montant: Number(montant),
      categorie,
      creePar: req.user?._id
    };

    const budgetActualise = await BudgetService.addLigne(budgetId, ligneData);

    return res.status(200).json(budgetActualise);
  } catch (error: any) {
    const status = error.message === "Budget introuvable" ? 404 : 500;
    return res.status(status).json({ message: error.message });
  }
};

export const submitBudget = async (req: Request, res: Response) => {
  try {
    const budgetId = Array.isArray(req.params.budgetId)
      ? req.params.budgetId[0]
      : req.params.budgetId;
    const budget = await BudgetService.submitBudget(budgetId);
    return res.status(200).json(budget);
  } catch (error: any) {
    const status = error.message === "Budget introuvable" ? 404 : 400;
    return res.status(status).json({ message: error.message });
  }
};

export const getBudgets = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.direction) {
      return res.status(401).json({ message: "Direction non identifiée" });
    }

    const budgets = await BudgetService.getBudgetsByDirection(
      req.user.direction
    );

    return res.status(200).json(budgets);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
