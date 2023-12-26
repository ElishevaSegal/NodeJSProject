import { Schema } from "mongoose";

import { IUser } from "../../@types/user";
import { nameSchema } from "./name_schema";
import { addressSchema } from "./address_schema";
import { imageSchema } from "./image_schema";

const userSchema = new Schema<IUser>({
  name: nameSchema,
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      url: "https://cdn-icons-png.flaticon.com/256/147/147142.png",
      alt: "user-profile",
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
    unique: true,
  },
  password: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

export { userSchema };
