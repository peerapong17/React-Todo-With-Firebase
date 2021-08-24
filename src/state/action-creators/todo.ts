import { todoActionTypes } from "./../action-types/todo";
import { TodoAction } from "./../actions/todo";
import { Dispatch } from "redux";
import { auth, db, timeStamp } from "../../firebase/firebaseConfig";

export const fetchTodo =
  () =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    dispatch({
      type: todoActionTypes.FETCH_TODO,
    });
    try {
      db.collection("todos")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapShot) => {
          const changes = snapShot.docs;
          const filteredData = changes.filter((doc) => {
            return doc.data()["userId"] === auth.currentUser?.uid;
          });
          dispatch({
            type: todoActionTypes.FETCH_TODO_SUCCESS,
            payload: filteredData,
          });
        });
    } catch (error) {
      dispatch({
        type: todoActionTypes.TODO_ERROR,
        payload: error.message,
      });
    }
  };

export const addTodo =
  (task: string) =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    try {
      await db.collection("todos").add({
        task,
        createdAt: timeStamp(),
        userId: auth.currentUser?.uid ?? "No User Id",
      });
    } catch (error) {
      dispatch({
        type: todoActionTypes.TODO_ERROR,
        payload: error.message,
      });
    }
  };
export const updateTodo =
  (id: string, task: string) =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    try {
      await db.collection("todos").doc(id).update({ task });
    } catch (error) {
      dispatch({
        type: todoActionTypes.TODO_ERROR,
        payload: error.message,
      });
    }
  };

export const deleteTodo =
  (id: string) =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    try {
      await db.collection("todos").doc(id).delete();
    } catch (error) {
      dispatch({
        type: todoActionTypes.TODO_ERROR,
        payload: error.message,
      });
    }
  };

export const clerError =
  () =>
  async (dispatch: Dispatch<TodoAction>): Promise<void> => {
    dispatch({
      type: todoActionTypes.CLEAR_ERROR,
    });
  };
