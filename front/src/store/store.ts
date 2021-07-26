import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { mainReducer } from "./mainReducer";
import { menuReducer } from "./menuReducer";
import { authReducer } from "./authReducer";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";
let reducers = combineReducers({
  mainReducer,
  form: formReducer,
  authReducer,
  menuReducer
});
export type actionsTypes<T extends {[keys:string]:(...args:any[])=>any}>=ReturnType<T extends {[key:string]:infer U}?U:never>;
export type GlobalState=ReturnType<typeof reducers>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
