import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: yup
    .string()
    .min(6, "Must be 6 characters or more")
    .required("Password is required"),
});
