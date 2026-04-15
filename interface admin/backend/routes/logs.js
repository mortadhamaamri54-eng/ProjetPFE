const router = require("express").Router()
const Log = require("../models/Log")

router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 })
    res.json(logs)
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router