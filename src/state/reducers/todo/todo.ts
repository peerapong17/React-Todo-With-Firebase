import { TodoAction } from "../../actions/todo";
import { todoActionTypes } from "./../../action-types/todo";
import { TodoState } from "./model";

const initialState: TodoState = {
  loading: false,
  todoList: [],
  error: "",
};

export const todoReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case todoActionTypes.FETCH_TODO:
      return {
        todoList: [],
        error: "",
        loading: true,
      };
    case todoActionTypes.FETCH_TODO_SUCCESS:
      return {
        todoList: action.payload.map((doc) => {
          return { ...doc.data(), id: doc.id };
        }),
        loading: false,
        error: "",
      };
    case todoActionTypes.TODO_ERROR:
      return {
        todoList: [],
        loading: false,
        error: action.payload,
      };
    case todoActionTypes.CLEAR_ERROR:
      return {
        ...state,
        loading: false,
        error: "",
      };
    // case todoActionTypes.UPDATE_TODO:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: "",
    //   };
    // case todoActionTypes.DELETE_TODO:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: "",
    //   };

    default:
      return state;
  }
};
