import { authReducer } from './auth/auth';
import { todoReducer } from './todo/todo';
import { combineReducers } from "redux";


const reducers = combineReducers({
    authReducer,
    todoReducer
})


export default reducers

export type RootState = ReturnType<typeof reducers>;