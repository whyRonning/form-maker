import { actionsTypes } from "./store";

type dataInputNumParamType = {
  id: string;
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
  inputs: Array<dataInputNumParamType>;
};
export const data = {
  isAuth: false,
  userTemplates: [] as Array<dataType>,
  token: "",
};
type actionTypes = actionsTypes<typeof actions>;

export const authReducer = (
  state: dataAuthType = data,
  action: actionTypes
) => {
  switch (action.type) {
    case "Auth": {
      const copyState = { ...state };
      copyState.isAuth = action.isAuth;
      copyState.userTemplates = action.templates;
      copyState.token = action.token;
      return { ...copyState };
    }
    case "userTemplates": {
      const copyState = JSON.parse(JSON.stringify(state));
      copyState.userTemplates.push(action.userTemplates);
      return { ...copyState };
    }
    case "deconsteUserTemplatesAC": {
      const copyState = JSON.parse(JSON.stringify(state));
      copyState.userTemplates.splice(action.template, 1);
      return { ...copyState };
    }
    case "logout": {
      const copyState = { ...state };
      copyState.isAuth = false;
      return { ...copyState };
    }
    default: {
      return state;
    }
  }
};
export const actions = {
  isAuthAC: (isAuth: boolean, templates: Array<dataType>, token: string) =>
    ({
      type: "Auth",
      isAuth,
      templates,
      token,
    } as const),
  userTemplatesAC: (userTemplates: dataType) =>
    ({
      type: "userTemplates",
      userTemplates,
    } as const),
  deconsteUserTemplatesAC: (template: number) =>
    ({
      type: "deconsteUserTemplatesAC",
      template,
    } as const),
  logoutAC: () =>
    ({
      type: "logout",
    } as const),
};
