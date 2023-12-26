import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { Card } from "../database/model/card";

import { IUser } from "../@types/user";
import { BizCardsError } from "../error/biz-cards-error";
import { isValidObjectId } from "mongoose";

const isUsersCardOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { cardId } = req.params; 
    const valid = isValidObjectId(cardId);
    if (!valid) {
      throw new BizCardsError("The Id is not type of ObjectId", 401);
    }
    const cardExist = await Card.findById(cardId);
    if (!cardExist) throw new BizCardsError("Card does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;
    const card = await Card.findById({ _id: cardId });
    if (!card) throw new BizCardsError("Card does not exist", 401);

    if (card.userId == user._id) return next();
    if (user.isAdmin) return next();
    else
      throw new BizCardsError(
        "Only the user who created or admin the card can delete the card",
        401
      );
  } catch (e) {
    next(e);
  }
};

export { isUsersCardOrAdmin };
