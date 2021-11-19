import { authActionTypes } from "../action-types/auth";

interface Loading {
  type: authActionTypes.LOADING;
}
interface Success {
  type: authActionTypes.SUCCESS;
  payload: string;
}
interface Error {
  type: authActionTypes.ERROR;
  payload: string;
}
interface Clear {
  type: authActionTypes.CLEAR;
}

export type AuthAction = Loading | Success | Error | Clear;
