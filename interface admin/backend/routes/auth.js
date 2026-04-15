const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/login", async (req, res) => {
  try {
    const { email, motDePasse } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })

    const valid = await bcrypt.compare(motDePasse, user.motDePasse)
    if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" })
  }
})

module.exports = router