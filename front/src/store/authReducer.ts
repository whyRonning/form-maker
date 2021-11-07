import { stateOfHeaderAC } from "./menuReducer";
import { message } from "antd";
import { ThunkAction } from "redux-thunk";
import { actionsTypes, GlobalState } from "./store";
import { Action } from "redux";

type dataInputNumType = {
  [key: number]: dataInputNumParamType;
};
type dataInputNumParamType = {
  name: string | null;
  placeholder: string | null;
  type: string | null;
  width: number | null;
  height: number | null;
  fieldDescription: string | null;
  descriptionPosition: "inline" | "bottom";
};
type dataAuthType = typeof data;

export type dataType = {
  generalBackgroundColor: string;
  formBackgroundColor: string;
  selectedInput: string;
  textColor: string;
  buttColor: string;
  buttTextColor: string;
  title: string;
  descriptionColor: string;
  titleColor: string;
  labelsPosition: string;
  formWidth: number;
  formMarginTop: number;
  buttWidth: number;
  buttHeight: number;
  numOfFields: number;
  stateOfForm: boolean;
  isFillingVision: boolean;
  isFilterVision: boolean;
  inputs: dataInputNumType;
};
let data = {
  isAuth: false,
  token: "",
  userTemplates: [] as Array<dataType>,
  login: "",
  loginState: "login",
  isPreloaderVision: false,
};
type actionTypes = actionsTypes<typeof actions>;

export let authReducer = (state: dataAuthType = data, action: actionTypes) => {
  switch (action.type) {
    case "Auth": {
      let copyState = { ...state };
      copyState.isAuth = action.isAuth;
      copyState.token = action.token;
      copyState.userTemplates = action.templates;
      copyState.login = action.login;
      return { ...copyState };
    }
    case "userTemplates": {
      let copyState = { ...state };
      copyState.userTemplates.push(action.userTemplates);
      return { ...copyState };
    }
    case "deleteUserTemplatesAC": {
      let copyState = { ...state };
      copyState.userTemplates.splice(action.template, 1);
      return { ...copyState };
    }
    case "preloaderVision": {
      return { ...state, isPreloaderVision: !state.isPreloaderVision };
    }
    case "loginState": {
      return { ...state, loginState: action.state };
    }
    case "logout": {
      let copyState = { ...state };
      copyState.isAuth = false;
      copyState.token = "";
      return { ...copyState };
    }
    default: {
      return state;
    }
  }
};
export let actions = {
  isAuthAC: (
    isAuth: boolean,
    token: string,
    templates: Array<dataType>,
    login: string
  ) =>
    ({
      type: "Auth",
      isAuth,
      token,
      templates,
      login,
    } as const),
  loginStateAC: (state: "login" | "registration") =>
    ({
      type: "loginState",
      state,
    } as const),
  preloaderVisionAC: (preloaderVision: boolean) =>
    ({
      type: "preloaderVision",
      preloaderVision,
    } as const),
  userTemplatesAC: (userTemplates: dataType) =>
    ({
      type: "userTemplates",
      userTemplates,
    } as const),
  deleteUserTemplatesAC: (template: number) =>
    ({
      type: "deleteUserTemplatesAC",
      template,
    } as const),
  logoutAC: () =>
    ({
      type: "logout",
    } as const),
};

export let LogoutThunk = (): ThunkAction<
  void,
  GlobalState,
  unknown,
  Action
> => {
  return (dispatch, getState) => {
    localStorage.removeItem("token");
    dispatch(actions.logoutAC());
    let state = getState();
    if (state.menuReducer.stateOfHeader === 3) dispatch(stateOfHeaderAC(2));
    message.success("Вы вышли из аккаунта");
  };
};
