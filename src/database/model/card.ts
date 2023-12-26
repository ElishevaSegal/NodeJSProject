import mongoose from "mongoose";
import { cardSchema } from "../schema/card_schema";


const Card = mongoose.model("cards", cardSchema);

export { Card };
