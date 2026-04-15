import mongoose, { Schema, Document } from "mongoose";

export interface ILigne extends Document {
  budget: mongoose.Types.ObjectId;
  description: string;
  montant: number;
}

const ligneSchema = new Schema<ILigne>(
  {
    budget: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
      required: true
    },
    description: { type: String, required: true },
    montant: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<ILigne>("Ligne", ligneSchema);