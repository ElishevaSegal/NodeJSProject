import { Router } from "express";
import { Card } from "../database/model/card";
import {
  validateCreateCard,
} from "../middleware/validation";
import { ICard, ICardInput } from "../@types/card";
import { createCard } from "../service/cards-service";
import { isBusiness } from "../middleware/is-business";
import { isUsersCard } from "../middleware/is-user-for-cards";
import { BizCardsError } from "../error/biz-cards-error";
import { validateToken } from "../middleware/validate-token";
import { likesRepeat } from "../middleware/likes-repeat";
import { isValidObjectId } from "mongoose";

const router = Router();

//GET all card
router.get("/", async (req, res, next) => {
  try {
    const allCards = await Card.find();
    if (!allCards) {
      res.json("No cards yet");
    }
    return res.json(allCards);
  } catch (e) {
    next(e);
  }
});

//GET my cards
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const myCards = await Card.find({ userId });
    if (!myCards.length) {
      return res.json({ message: "No Cards for this user", myCards });
    }
    return res.json(myCards);
  } catch (e) {
    next(e);
  }
});

//POST new card
router.post("/", isBusiness, validateCreateCard, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new BizCardsError("User must have id", 500);
    }
    const saved = await createCard(req.body as ICard, userId);
    res.status(201).json({ message: "New card saved", card: saved });
  } catch (e) {
    next(e);
  }
});

//GET card by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
     const validId = isValidObjectId(id);
     if (!validId) throw new BizCardsError("Id is not valid", 401);
    const card = (await Card.findById(id)) as ICardInput;
    if (!card) {
      throw new BizCardsError("Card not found", 404);
    }
    res.json(card);
  } catch (e) {
    next(e);
  }
});

//PUT edit card
router.put("/:id", isUsersCard, async (req, res, next) => {
  try {
    const savedCard = await Card.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ message: "card updeted", savedCard });
  } catch (e) {
    next(e);
  }
});

//DELETE card
router.delete("/:id", isUsersCard, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteCard = await Card.findOneAndDelete({ _id: id });
    return res.json({ message: "card deleted", deleteCard });
  } catch (e) {
    next(e);
  }
});

//PATCH liked card
router.patch("/:id", validateToken, likesRepeat, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const saved = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: userId } },
      {
        new: true,
      }
    );
    if(!saved){
      throw new BizCardsError("Card not found",404)
    }
    res.json({ saved });
  } catch (e) {
    next(e);
  }
});

export { router as cardsRouter };
