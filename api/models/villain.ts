import { Schema, model } from "mongoose";

interface Villain {
  id: string;
  name: string;
  description: string;
}

const villainSchema = new Schema<Villain>({
  id: { type: String, required: true },
  name: { type: String, required: true, immutable: false },
  description: { type: String, required: true, immutable: false },
});

const VillainModel = model<Villain>("Villain", villainSchema);

export default VillainModel;
