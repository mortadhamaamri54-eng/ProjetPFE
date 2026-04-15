import User from "../models/User";
import "../models/Direction"; 
import generateToken from "../utils/generatedToken";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
      return res.status(400).json({ message: "Champs requis" });
    }

    const user = await User.findOne({ email })
      .select("+motDePasse")
      .populate("direction");

    if (!user || !(await user.matchPassword(motDePasse))) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    res.json({
      _id: user._id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      role: user.role,

      direction: {
        _id: (user.direction as any)._id,
        nom: (user.direction as any).nom,
        code: (user.direction as any).code,
      },

      token: generateToken(user._id.toString()),
    });

  } catch (error) {
    console.error("🔥 ERREUR LOGIN:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

export const getCurrentUser = async (req: any, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    res.json(req.user);
  } catch (error) {
    console.error("🔥 ERREUR GET CURRENT USER:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};