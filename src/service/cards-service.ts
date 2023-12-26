import { RequestHandler } from "express";
import { ICard } from "../@types/card";
import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";
import { Logger } from "../logs/logger";
import { extractToken } from "../middleware/is-admin";
import { isBusiness } from "../middleware/is-business";
import { auth } from "./auth-service";
import { User } from "../database/model/user";
import { ICardInput } from "./../@types/card.d";
const createCard = async (data: ICardInput, userId: string) => {
  const card = new Card(data);

  card.userId = userId;
  //random number that does not exist in the database:
  while (true) {
    const random = Math.floor(Math.random() * 1_000_000);
    const dbRes = await Card.findOne({ bizNumber: random });
    if (!dbRes) {
      card.bizNumber = random;
      break;
    }
  }

  return card.save();
};


export { createCard };
