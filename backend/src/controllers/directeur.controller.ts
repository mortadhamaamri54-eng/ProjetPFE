import Budget from "../models/Budget";
import Ligne from "../models/Ligne";

export const createBudget = async (req: any, res: any) => {
  try {
    const { type, title } = req.body;

    if (!type) {
      return res.status(400).json({ message: "Le type de budget est requis" });
    }

    const budget = await Budget.create({
      directeur: req.user._id,
      type,
      title,
      total: 0,
      statut: "brouillon",
      lignes: []
    });

    res.status(201).json(budget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ message: "Erreur lors de la création du budget" });
  }
};

export const mesBudgets = async (req: any, res: any) => {
  try {
    const budgets = await Budget.find({ directeur: req.user._id })
      .populate("lignes");

    res.json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des budgets" });
  }
};

export const ajouterLigne = async (req: any, res: any) => {
  try {
    const { description, montant, categorie } = req.body;

    if (!description || montant === undefined || montant === null || isNaN(Number(montant))) {
      return res.status(400).json({ message: "Description et montant valides requis" });
    }

    const ligne = await Ligne.create({
      budget: req.params.id,
      description,
      montant
    });

    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget introuvable" });
    }

    budget.lignes.push(ligne._id);
    budget.total = (budget.total || 0) + Number(montant);
    await budget.save();

    res.status(200).json(budget);
  } catch (error) {
    console.error("Error adding ligne:", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la ligne" });
  }
};

export const soumettre = async (req: any, res: any) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget introuvable" });
    }

    budget.statut = "soumis";
    await budget.save();

    res.json(budget);
  } catch (error) {
    console.error("Error submitting budget:", error);
    res.status(500).json({ message: "Erreur lors de la soumission du budget" });
  }
};

export const deleteBudget = async (req: any, res: any) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget introuvable" });
    }

    await Ligne.deleteMany({ budget: budget._id });
    await budget.deleteOne();

    res.json({ message: "Budget supprimé avec succès" });
  } catch (error) {
    console.error("Error deleting budget:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du budget" });
  }
};