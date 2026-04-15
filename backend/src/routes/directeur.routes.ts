import { Router } from "express";
import {
  createBudget,
  mesBudgets,
  ajouterLigne,
  soumettre,
  deleteBudget
} from "../controllers/directeur.controller";

import { protect } from "../middlewears/auth";
import { checkBudgetDirection } from "../middlewears/checkDirection";

const router = Router();

router.use(protect);

router.post("/", createBudget);
router.get("/mes-budgets", mesBudgets);
router.post("/:id/lignes", checkBudgetDirection, ajouterLigne);
router.put("/:id/soumettre", checkBudgetDirection, soumettre);
router.delete("/:id", checkBudgetDirection, deleteBudget);

export default router;