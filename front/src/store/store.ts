import { createStore, combineReducers } from "redux";
import { mainReducer } from "./mainReducer";
import { menuReducer } from "./menuReducer";
import { authReducer } from "./authReducer";

const reducers = combineReducers({
  mainReducer,
  authReducer,
  menuReducer,
});
export type actionsTypes<
  T extends { [keys: string]: (...args: any[]) => any }
> = ReturnType<T extends { [key: string]: infer U } ? U : never>;
export type GlobalState = ReturnType<typeof reducers>;
const store = createStore(reducers);

export default store;
