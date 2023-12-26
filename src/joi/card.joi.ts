import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import {phoneRegex } from "./patterns";
import { ICard } from "../@types/card";

const schema = Joi.object<ICard>({
title:Joi.string().min(1).max(50).required(),
subtitle:Joi.string().min(1).max(50).required(),
description:Joi.string().min(1).max(200).required(),
web:Joi.string().min(1).max(50).allow(""),
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
  phone: Joi.string().min(9).max(15).required().pattern(phoneRegex),  
});

export { schema as joiCardSchema };
