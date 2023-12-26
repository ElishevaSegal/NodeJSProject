import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { passwordRegex, phoneRegex } from "./patterns";

const schema = Joi.object<IUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(20).required(),
    middle: Joi.string().min(2).max(20).allow(""),
    last: Joi.string().min(2).max(20).required(),
  }),
  address: Joi.object<IAddress>({
    state: Joi.string().min(2).max(50).allow(""),
    country: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(0).max(999999).required(),
    zip: Joi.string().min(2).max(30).allow(""),
  }),
  image: Joi.object<IImage>({
    url: Joi.string().min(12).max(200).allow(""),
    alt: Joi.string().min(2).max(200).allow(""),
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .min(5),
  password: Joi.string()
    .min(7)
    .max(20)
    .pattern(passwordRegex)
    .messages({
      "string.pattern.base":
        "User password must be at least 9 characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-",
      "string.empty": "Password is not allowed to be empty",
    })
    .min(2)
    .max(20)
    .required(),
  phone: Joi.string().min(9).max(15).required().pattern(phoneRegex),
  isAdmin: Joi.boolean().allow(),
  isBusiness: Joi.boolean().required(),
  createdAt: Joi.date().allow().default(new Date()),
});

export { schema as joiUserSchema };
