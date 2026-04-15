import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  directeur: mongoose.Types.ObjectId;
  type: string;
  title?: string;
  total: number;
  statut: "brouillon" | "soumis";
  lignes: mongoose.Types.ObjectId[];
}

const budgetSchema = new Schema<IBudget>(
  {
    directeur: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    total: {
      type: Number,
      default: 0
    },
    statut: {
      type: String,
      enum: ["brouillon", "soumis"],
      default: "brouillon"
    },
    lignes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Ligne"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budget", budgetSchema);