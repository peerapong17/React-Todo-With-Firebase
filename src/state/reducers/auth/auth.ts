import { AuthState } from "./model/authState";
import { AuthAction } from "../../actions/auth";
import { authActionTypes } from "../../action-types/auth";

const initialState: AuthState = {
  error: "",
  loading: false,
  success: "",
};

export const auth = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case authActionTypes.LOADING:
      return {
        success: "",
        loading: true,
        error: "",
      };
    case authActionTypes.SUCCESS:
      return {
        success: action.payload,
        loading: false,
        error: "",
      };
    case authActionTypes.ERROR:
      return {
        success: "",
        loading: false,
        error: action.payload,
      };
    case authActionTypes.CLEAR:
      return {
        success: "",
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};
