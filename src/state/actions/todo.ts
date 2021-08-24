import { todoActionTypes } from "../action-types/todo";

interface FetchTodo {
  type: todoActionTypes.FETCH_TODO;
}
interface FetchTodoSuccess {
  type: todoActionTypes.FETCH_TODO_SUCCESS;
  payload: any[];
}
interface UpdateTodo {
  type: todoActionTypes.UPDATE_TODO;
}
interface DeleteTodo {
  type: todoActionTypes.DELETE_TODO;
}
interface TodoError {
  type: todoActionTypes.TODO_ERROR;
  payload: string;
}
interface ClearError {
  type: todoActionTypes.CLEAR_ERROR;
}

export type TodoAction =
  | FetchTodo
  | FetchTodoSuccess
  | UpdateTodo
  | DeleteTodo
  | TodoError
  | ClearError;
