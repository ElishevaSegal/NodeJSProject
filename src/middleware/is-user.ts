import { RequestHandler, Request } from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { BizCardsError } from "../error/biz-cards-error";
import { IUser } from "../@types/user";
import { isValidObjectId } from "mongoose";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = isValidObjectId(id);
    if (!validId) throw new BizCardsError("Id is not valid", 401);

    const userExistById = await User.findById(id);
    if (!userExistById) throw new BizCardsError("User does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = (await User.findOne({ email }).lean()) as IUser;

    req.user = user;

    if (!user) throw new BizCardsError("User does not exist-check your token", 401);

    if (id == user?._id) return next();

    res.status(401).json({ message: "The id must belong to the user" });
  } catch (e) {
    next(e);
  }
};

export { isUser };
