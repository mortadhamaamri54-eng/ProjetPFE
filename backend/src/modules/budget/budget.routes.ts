import { Router } from "express";
import {
    createBudget,
    addLigne,
    submitBudget,
    getBudgets
} from "./budget.controller";
const router = Router();
router.post("/", createBudget);
router.get("/", getBudgets);
router.post("/:budgetId/lignes", addLigne);
router.put("/:budgetId/submit", submitBudget);
export default router;

