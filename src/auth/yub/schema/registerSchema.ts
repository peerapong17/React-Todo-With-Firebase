import * as yup from "yup";

export const registerValidationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Must be 4 characters or more")
    .matches(/^[^\d]+/,"Username cannot start with number")
    .matches(/[a-zA-Z]{3,}/g,"Username should contain at least 3 letters")
    .matches(/^[a-zA-Z.-\s\d]+$/, "Username cannot contain special character")
    .required("Username is Required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: yup
    .string()
    .min(6, "Must be 6 characters or more")
    .matches(/[a-zA-Z]{3,}/g, "Passoword should contain at least 3 letters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm-Password is required"),
});
