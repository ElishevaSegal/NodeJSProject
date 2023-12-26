import { RequestHandler} from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import { isValidObjectId } from "mongoose";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = isValidObjectId(id);
    if (!validId) throw new BizCardsError("Id is not valid", 401);

    const userExistById = await User.findById(id);
    if (!userExistById) throw new BizCardsError("User does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("User does not exist-check your token", 401);

    if (id == user.id) return next();

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

export { isAdminOrUser };
