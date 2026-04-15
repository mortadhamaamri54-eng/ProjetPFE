const mongoose = require("mongoose")

const DirectionSchema = new mongoose.Schema({
  code:      { type: String, required: true },
  nom:       { type: String, required: true },
  budget:    { type: Number, default: 0 },
  directeur: { type: String, default: null },
}, { timestamps: true })

module.exports = mongoose.model("Direction", DirectionSchema)