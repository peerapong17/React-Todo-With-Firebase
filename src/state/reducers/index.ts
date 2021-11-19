import { auth } from './auth/auth';
import { todo } from './todo/todo';
import { combineReducers } from "redux";


const reducers = combineReducers({
    authReducer: auth,
    todoReducer: todo
})


export default reducers

export type RootState = ReturnType<typeof reducers>;