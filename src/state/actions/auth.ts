import { authActionTypes } from "../action-types/auth";

interface Login {
  type: authActionTypes.LOGIN;
}
interface LoginSuccess {
  type: authActionTypes.LOGIN_SUCCESS;
}
interface LoginError {
  type: authActionTypes.LOGIN_ERROR;
  payload: string;
}
interface Register {
  type: authActionTypes.REGISTER;
}
interface RegisterSuccess {
  type: authActionTypes.REGISTER_SUCCESS;
  payload: string;
}
interface RegisterError {
  type: authActionTypes.REGISTER_ERROR;
  payload: string;
}
interface ResetPassword {
  type: authActionTypes.RESET_PASSWORD;
}
interface ResetPasswordSuccess {
  type: authActionTypes.RESET_PASSWORD_SUCCESS;
  payload: string;
}
interface ResetPasswordError {
  type: authActionTypes.RESET_PASSWORD_ERROR;
  payload: string;
}
interface ClearError {
  type: authActionTypes.CLEAR_ERROR;
}

export type AuthAction =
  | Register
  | RegisterError
  | RegisterSuccess
  | Login
  | LoginError
  | LoginSuccess
  | ResetPassword
  | ResetPasswordSuccess
  | ResetPasswordError
  | ClearError;
