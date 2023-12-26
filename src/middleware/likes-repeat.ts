import { RequestHandler } from "express";
import { Card } from "../database/model/card";
import { isValidObjectId } from "mongoose";
import { BizCardsError } from "../error/biz-cards-error";

const likesRepeat: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cardId = req.params.id;
    const valid = isValidObjectId(cardId);
    if (!valid) {
      throw new BizCardsError("The Id is not type of ObjectId", 401);
    }
    const cardExist = await Card.findById(cardId);
    if (!cardExist) throw new BizCardsError("Card does not exist", 401);
    const { likes } = await Card.findById(cardId);

    // Check if userId is in the likes array
    if (likes.includes(userId)) {
      const card = await Card.findOneAndUpdate(
        { _id: cardId },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json({ card });
    } else {
      next();
    }
  } catch (e) {
    next(e);
  }
};
export { likesRepeat };
