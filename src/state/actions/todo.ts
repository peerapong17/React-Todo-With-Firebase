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
interface Error {
  type: todoActionTypes.ERROR;
  payload: string;
}
interface Clear {
  type: todoActionTypes.CLEAR;
}

export type TodoAction =
  | FetchTodo
  | FetchTodoSuccess
  | UpdateTodo
  | DeleteTodo
  | Error
  | Clear;
