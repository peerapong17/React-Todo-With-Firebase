import { Dispatch } from "redux";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { AuthAction } from "../actions/auth";
import { authActionTypes } from "../action-types/auth";

export const login =
  (email: string, password: string, history: any) =>
  async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    dispatch({
      type: authActionTypes.LOGIN,
    });
    try {
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
      });
      setTimeout(() => {
        history.push("/todo");
      }, 1000);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/wrong-password") {
        dispatch({
          type: authActionTypes.LOGIN_ERROR,
          payload: "Password is not correct",
        });
        return;
      }
      if (error.code === "auth/user-not-found") {
        dispatch({
          type: authActionTypes.LOGIN_ERROR,
          payload: "Username is not correct or This user does not exist",
        });
        return;
      }
      dispatch({
        type: authActionTypes.LOGIN_ERROR,
        payload: error.message,
      });
    }
  };

export const register =
  (username: string, email: string, password: string, history: any) =>
  async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    dispatch({
      type: authActionTypes.REGISTER,
    });
    try {
      const res =await auth.createUserWithEmailAndPassword(email, password)
      await res.user?.updateProfile({displayName: username})
      dispatch({
        type: authActionTypes.REGISTER_SUCCESS,
        payload: "Create user success",
      });
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    } catch (error) {
      dispatch({
        type: authActionTypes.REGISTER_ERROR,
        payload: error.message,
      });
    }
  };

export const resetPassword =
  (email: string, history: any) =>
  async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    dispatch({
      type: authActionTypes.RESET_PASSWORD,
    });
    try {
      await auth.sendPasswordResetEmail(email);
      dispatch({
        type: authActionTypes.RESET_PASSWORD_SUCCESS,
        payload: "Password reset link was sent to your Email",
      });
      setTimeout(() => {
        history.push("/login");
      }, 6000);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/user-not-found") {
        dispatch({
          type: authActionTypes.RESET_PASSWORD_ERROR,
          payload: "Email could be wrong or This email does not exist",
        });
        return;
      }
      dispatch({
        type: authActionTypes.RESET_PASSWORD_ERROR,
        payload: error.message,
      });
    }
  };

export const signInWithGoogle =
  (history: any) =>
  async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    dispatch({
      type: authActionTypes.LOGIN,
    });
    try {
      await auth.signInWithPopup(googleProvider);
      dispatch({
        type: authActionTypes.LOGIN_SUCCESS,
      });
      setTimeout(() => {
        history.push("/todo");
      }, 1000);
    } catch (error) {
      dispatch({
        type: authActionTypes.LOGIN_ERROR,
        payload: error.message,
      });
    }
  };

export const clearError =
  () =>
  (dispatch: Dispatch<AuthAction>): void => {
    dispatch({
      type: authActionTypes.CLEAR_ERROR,
    });
  };
