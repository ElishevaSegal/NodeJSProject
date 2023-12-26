import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import { IUser } from "../@types/user";
import { ICard } from "../@types/card";
import { Logger } from "../logs/logger";
import { Card } from "../database/model/card";
import { isValidObjectId } from "mongoose";

const isUsersCard: RequestHandler = async (req, res, next) => {
  try {
    const { cardId } = req.params; //
    const valid = isValidObjectId(cardId);
    if (!valid) {
      throw new BizCardsError("Invalid Id", 401);
    }
    const cardExist = await Card.findById(cardId);
    if (!cardExist) throw new BizCardsError("Card does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;

    const card = await Card.findById({ _id: cardId });
    Logger.debug("card", card);
    if (!card) throw new BizCardsError("Card does not exist", 401);

    if (card.userId == user._id) return next();
    res.status(401).json({
      message: "Only the user who created the card can edit the card",
    });
  } catch (e) {
    next(e);
  }
};

export { isUsersCard };
