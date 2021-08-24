import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { TodoActionCreator } from "..";

export const useTodoAction = (): typeof TodoActionCreator => {
  const dispatch = useDispatch();

  return bindActionCreators(TodoActionCreator, dispatch);
};
