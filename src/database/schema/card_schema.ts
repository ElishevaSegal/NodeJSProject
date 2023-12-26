import { Schema } from "mongoose";
import { ICard } from "../../@types/card";
import { addressSchema } from "./address_schema";
import { imageSchema } from "./image_schema";

const cardSchema = new Schema<ICard>({
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      url: "https://images.pexels.com/photos/326576/pexels-photo-326576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      alt: "Biz card",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },
  email: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  title: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  subtitle: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  web: {
    required: false,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  description: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  bizNumber: {
    required: false,
    type: Number,
    default: () => Math.round(Math.random() * 1_000_000),
    minlength: 5,
    maxlength: 999999999999999,
    unique: true,
  },
  userId: {
    required: false,
    type: String,
    minlength: 20,
    maxlength: 30,
  },
  likes: [{
    required: false,
    type: String,
    default: [],
  }],
  createdAt: {
    required: false,
    type: Date,
    default: new Date(),
  },
});

export { cardSchema };
