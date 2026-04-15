const router = require("express").Router()
const User = require("../models/User")
const Log = require("../models/Log")
const bcrypt = require("bcryptjs")

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.post("/", async (req, res) => {
  try {
    const { nom, prenom, email, role, direction } = req.body
    const hash = await bcrypt.hash("123456", 10)
    const user = await User.create({ nom, prenom, email, motDePasse: hash, role, direction })
    await Log.create({ type: "Création", action: "Compte créé", user: `${prenom} ${nom}` })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.put("/:id/toggle", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.status = user.status === "actif" ? "inactif" : "actif"
    await user.save()
    await Log.create({ type: "Modification", action: "Statut modifié", user: `${user.prenom} ${user.nom}` })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    await Log.create({ type: "Suppression", action: "Compte supprimé", user: `${user.prenom} ${user.nom}` })
    res.json({ message: "Supprimé" })
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})
// Modifier email
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

// Changer mot de passe
router.put("/:id/password", async (req, res) => {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body
    const user = await User.findById(req.params.id)
    const valid = await bcrypt.compare(ancienMotDePasse, user.motDePasse)
    if (!valid) return res.status(401).json({ message: "Ancien mot de passe incorrect" })
    user.motDePasse = await bcrypt.hash(nouveauMotDePasse, 10)
    await user.save()
    res.json({ message: "Mot de passe modifié" })
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router