import * as yup from "yup";

export const validationSchema = yup.object({
  // username: yup.string("Enter username").required("Please enter your username"),
  password: yup.string("Enter a password").required("Password is required"),
});
