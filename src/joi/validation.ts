import Joi from "joi";

const validation = (schema: Joi.ObjectSchema, userBody: any) => {
  const { error } = schema.validate(userBody);
  if (!error) {
    return null;
  }
  const { message, path } = error.details[0];
  return { message, path };
};
export { validation };
