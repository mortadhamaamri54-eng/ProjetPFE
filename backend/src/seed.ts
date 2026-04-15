import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User";
import Direction from "./models/Direction";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log(" MongoDB connecté");

    await User.deleteMany();
    await Direction.deleteMany();
    console.log(" DB nettoyée");

    const directions = await Direction.insertMany([
      { nom: "Informatique", code: "DI" },
      { nom: "Ressources Humaines", code: "RH" },
      { nom: "Juridique", code: "AJ" },
    ]);

    console.log(" Directions créées");

    const di = directions.find((d) => d.code === "DI");
    const rh = directions.find((d) => d.code === "RH");
    const aj = directions.find((d) => d.code === "AJ");

    const users = [
      {
        nom: "Ben Salah",
        prenom: "Ahmed",
        email: "director.di@test.com",
        motDePasse: "1234",
        role: "directeur",
        direction: di?._id,
      },
      {
        nom: "Trabelsi",
        prenom: "Sami",
        email: "director.rh@test.com",
        motDePasse: "1234",
        role: "directeur",
        direction: rh?._id,
      },
      {
        nom: "Ben Ali",
        prenom: "Karim",
        email: "director.aj@test.com",
        motDePasse: "1234",
        role: "directeur",
        direction: aj?._id,
      },
    ];

    for (const u of users) {
      await User.create(u);
      console.log(` User créé: ${u.email}`);
    }

    console.log(" Seed terminé avec succès");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(" Erreur seed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seed();