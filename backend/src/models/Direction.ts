import mongoose, { Schema, Document } from "mongoose";

export interface IDirection extends Document {
  nom: string;
  code: string; 

}
const directionSchema = new Schema<IDirection>(
  {
    nom: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Direction = mongoose.model<IDirection>("Direction", directionSchema);

export default Direction;