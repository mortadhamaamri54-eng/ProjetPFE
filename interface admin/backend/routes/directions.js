const router = require("express").Router()
const Direction = require("../models/Direction")

router.get("/", async (req, res) => {
  try {
    const directions = await Direction.find()
    res.json(directions)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.post("/", async (req, res) => {
  try {
    const direction = await Direction.create(req.body)
    res.json(direction)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const direction = await Direction.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(direction)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router