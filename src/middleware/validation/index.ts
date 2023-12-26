import { joiCardSchema } from "../../joi/card.joi";
import { joiLoginSchema } from "../../joi/login.joi";
import { joiUserSchema } from "../../joi/user.joi";
import { validateSchema } from "./validate-schema";

const validateUserRegistration = validateSchema(joiUserSchema);
const validateUserLogin = validateSchema(joiLoginSchema);
const validateCreateCard = validateSchema(joiCardSchema)

export { validateUserRegistration ,validateUserLogin,validateCreateCard};
