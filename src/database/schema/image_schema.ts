import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    required: true,
    type: String,
    minlength: 12,
    maxlength: 200,
  },
  alt: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 200,
  },
});
export { imageSchema };
