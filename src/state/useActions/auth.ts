import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AuthActionCreator } from "..";

export const useAuthAction = (): typeof AuthActionCreator => {
  const dispatch = useDispatch();

  return bindActionCreators(AuthActionCreator, dispatch);
};
