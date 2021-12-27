import { Schema, model } from "mongoose";

interface Hero {
  id: string;
  name: string;
  description: string;
}

const heroSchema = new Schema<Hero>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const HeroModel = model<Hero>("Hero", heroSchema);

export default HeroModel;
