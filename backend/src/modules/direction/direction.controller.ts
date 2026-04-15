import { Request,Response } from "express";
import * as directionService from "./direction.service"

export const getDirections=(req:Request,res:Response)=>{
res.json(directionService.getAllDirections());
};
export const getDirection=(req:Request,res:Response)=>{
    const{id}=req.params;
    const direction=directionService.getDirectionById(Number(id));
    if(!direction){
        return res.status(404).json({message:"Direction not found"});
    }
    res.json(direction);
};
export const createDirection=(req:Request,res:Response)=>{
const {nom,description}=req.body;
const direction=directionService.createDirection(nom,description);
res.status(201).json(direction);
};
export const updateDirection = (req: Request, res: Response) => {

  const { id } = req.params;
  const { nom, description } = req.body;

  const updated = directionService.updateDirection(
    Number(id),
    nom,
    description
  );

  if (!updated) {
    return res.status(404).json({ message: "Direction not found" });
  }

  res.json(updated);
};
export const deleteDirection = (req: Request, res: Response) => {

  const { id } = req.params;

  const success = directionService.deleteDirection(Number(id));

  if (!success) {
    return res.status(404).json({ message: "Direction not found" });
  }

  res.json({ message: "Deleted successfully" });
};
