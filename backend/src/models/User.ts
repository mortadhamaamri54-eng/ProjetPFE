import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: "directeur";
  direction: mongoose.Types.ObjectId;

  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },

    motDePasse: {
  type: String,
  required: true,
  select: false
},

    role: {
      type: String,
      enum: ["directeur"],
      default: "directeur",
    },

    direction: {
      type: Schema.Types.ObjectId,
      ref: "Direction", 
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const user = this as IUser;

  if (!user.isModified("motDePasse")) return;

  const salt = await bcrypt.genSalt(10);
  user.motDePasse = await bcrypt.hash(user.motDePasse, salt);
});

userSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.motDePasse);
};

export default mongoose.model<IUser>("User", userSchema);