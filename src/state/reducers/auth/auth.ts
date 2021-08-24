import { AuthState } from "./model/authState";
import { AuthAction } from "../../actions/auth";
import { authActionTypes } from "../../action-types/auth";

const initialState: AuthState = {
  error: "",
  loading: false,
  success: "",
};

export const authReducer = (
  state = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case authActionTypes.LOGIN:
      return {
        success: "",
        error: "",
        loading: true,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        success: "",
        loading: false,
        error: "",
      };
    case authActionTypes.LOGIN_ERROR:
      return {
        loading: false,
        success: "",
        error: action.payload,
      };
    case authActionTypes.REGISTER:
      return {
        success: "",
        loading: true,
        error: "",
      };
    case authActionTypes.REGISTER_SUCCESS:
      return {
        error: "",
        loading: false,
        success: action.payload,
      };
    case authActionTypes.REGISTER_ERROR:
      return {
        success: "",
        loading: false,
        error: action.payload,
      };
    case authActionTypes.RESET_PASSWORD:
      return {
        success: "",
        loading: true,
        error: "",
      };
    case authActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        success: action.payload,
        loading: false,
        error: "",
      };
    case authActionTypes.RESET_PASSWORD_ERROR:
      return {
        success: "",
        loading: false,
        error: action.payload,
      };
    case authActionTypes.CLEAR_ERROR:
      return {
        success: "",
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};
