import Budget from "../models/Budget";

export const checkBudgetDirection = async (req: any, res: any, next: any) => {
  const budget = await Budget.findById(req.params.id);

  if (!budget) {
    return res.status(404).json({ message: "Budget introuvable" });
  }

  if (budget.directeur.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Accès interdit" });
  }

  next();
};