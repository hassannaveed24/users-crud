import { UpdateUserFormValues } from "@/data/user/update-user.data";
import { User } from "@auth0/auth0-spa-js";

export const getInitialValues = (user: User) => {
  const initialValues: UpdateUserFormValues = {
    name: user.name,
    picture: user.picture,
    email: user.email,
  };
  return initialValues;
};
