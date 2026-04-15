import { Router } from "express";
import {getDirections,
    getDirection,
    createDirection,
    updateDirection,
    deleteDirection
}from "./direction.controller";
const router=Router();
router.get("/",getDirections);
router.get("/:id",getDirection);
router.post("/",createDirection);
router.put("/:id",updateDirection);
router.delete("/:id",deleteDirection);
export default router;