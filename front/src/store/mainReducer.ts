import Template2 from "./../accets/img/Template-2.png";
import Template3 from "./../accets/img/Template-3.png";
import Template4 from "./../accets/img/Template-4.png";
import axios, {AxiosError, AxiosResponse} from "axios";
import {dataType as authDataType} from "./authReducer"
import {actions as authActions} from "./authReducer";
import Template1 from "./../accets/img/Template-1.png";
import {message} from "antd";
import {valuesType} from "../components/contact/helpContainer";
import {valuesRegistrationType} from "../components/registration/registrationContainer";
import {valuesAuthType} from "../components/auth/authContainer";
import {ThunkAction} from "redux-thunk";
import {actionsTypes, GlobalState} from "./store";
import {Action} from "redux";

/***********************types of inputs*******************************/
export type dataInputNumType = {
    [key: number]: dataInputNumParamType
}
type dataInputNumParamType = {
    name: string,
    placeholder: string,
    type: string,
    width: number,
    height: number,
    fieldDescription: string,
    descriptionPosition: "inline" | "bottom",
}
/***********************types of templates*******************************/
type dataTemplatesNumbersFieldsType = {
    fields: dataTemplatesFieldsType,
    settings: dataTemplatesSettingsType
}
type dataTemplatesFieldsType = {
    [key: number]: dataInputNumParamType
}
type dataTemplatesSettingsType = {
    nameOfTemplate: string | null,
    generalBackgroundColor: string,
    image: string,
    group: string,
    labelsPosition: string,
    title: string | null,
    numOfFields: number,
    formWidth: number,
    buttWidth: number,
    buttHeight: number,
    formMarginTop: number,
    formBackgroundColor: string,
    textColor: string,
    descriptionColor: string,
    buttTextColor: string,
    titleColor: string,
    buttColor: string
}

/******************************************* *******************************/
type dataType = typeof data;

let data = {
    generalBackgroundColor: "#ffffff",
    formBackgroundColor: "#a3a19f",
    selectedInput: null as null | string,
    formWidth: 80,
    formMarginTop: 23,
    textColor: "#000000",
    buttColor: "#65ccbc",
    buttTextColor: "#fdfcff",
    buttWidth: 35,
    buttHeight: 6,
    stateOfForm: true,
    isFillingVision: true,
    title: "",
    descriptionColor: "#a175ff",
    titleColor: "#ffffff",
    labelsPosition: "top",
    numOfFields: 2,
    inputs: {
        1: {
            name: "Поле1",
            placeholder: "",
            type: "text",
            width: 20,
            height: 3,
            fieldDescription: "",
            descriptionPosition: "inline"
        },
        2: {
            name: "Поле2",
            placeholder: "",
            type: "text",
            width: 20,
            height: 3,
            fieldDescription: "",
            descriptionPosition: "inline"
        }
    } as dataInputNumType,
    isFilterVision: false,
    filters: [] as Array<string>,
    templates: [
        {
            fields: {
                1: {
                    name: "Имя",
                    placeholder: "Имя",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                2: {
                    name: "Фамилия",
                    placeholder: "Фамилия",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"

                },
                3: {
                    name: "Телефон",
                    placeholder: "Введите номер телефона",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                4: {
                    name: "Почта",
                    placeholder: "Введите почту",
                    type: "email",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                5: {
                    name: "Сообщение",
                    placeholder: "Сообщение",
                    type: "textarea",
                    width: 60,
                    height: 15,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                }
            },
            settings: {
                nameOfTemplate: "Шаблон 1",
                image: Template1,
                group: "Форма обратной связи",
                labelsPosition: "top",
                title: "Мы ответим на любые ваши вопросы",
                numOfFields: 2,
                buttWidth: 35,
                formWidth: 68,
                buttHeight: 6,
                descriptionColor: "#ffffff",
                formMarginTop: 2,
                generalBackgroundColor: "#ffffff",
                formBackgroundColor: "#a3a19f",
                textColor: "#ffffff",
                buttTextColor: "#fdfcff",
                titleColor: "#ffffff",
                buttColor: "#53c6b4"
            }
        },
        {
            fields: {
                1: {
                    name: "Почта",
                    placeholder: "Введите почту",
                    type: "email",
                    width: 15,
                    height: 4,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                }
            },
            settings: {
                nameOfTemplate: "Шаблон 2",
                image: Template2,
                group: "Подписка на рассылку",
                labelsPosition: "left",
                title: "Подписка на рассылку",
                numOfFields: 1,
                formWidth: 28,
                buttWidth: 21,
                generalBackgroundColor: "#ffffff",
                formBackgroundColor: "#a3a19f",
                buttHeight: 6,
                formMarginTop: 25,
                descriptionColor: "#ffffff",
                textColor: "#ffffff",
                buttTextColor: "#fdfcff",
                titleColor: "#ffffff",
                buttColor: "#53c6b4"
            }
        },
        {
            fields: {
                1: {
                    name: "Имя",
                    placeholder: "Имя",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                2: {
                    name: "Телефон",
                    placeholder: "Введите телефон",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                }
            },
            settings: {
                nameOfTemplate: "Шаблон 3",
                image: Template3,
                group: "Заказ звонка",
                labelsPosition: "top",
                title: "Заказ звонка",
                numOfFields: 2,
                formWidth: 68,
                generalBackgroundColor: "#ffffff",
                formBackgroundColor: "#a3a19f",
                buttWidth: 35,
                buttHeight: 6,
                formMarginTop: 23,
                textColor: "#ffffff",
                buttTextColor: "#fdfcff",
                titleColor: "#ffffff",
                descriptionColor: "#ffffff",
                buttColor: "#53c6b4"
            }
        },
        {
            fields: {
                1: {
                    name: "Имя",
                    placeholder: "Имя",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                2: {
                    name: "Фамилия",
                    placeholder: "Фамилия",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                },
                3: {
                    name: "Телефон",
                    placeholder: "Введите телефон",
                    type: "text",
                    width: 20,
                    height: 5,
                    fieldDescription: "",
                    descriptionPosition: "inline"
                }
            },
            settings: {
                nameOfTemplate: "Шаблон 4",
                image: Template4,
                group: "Оформление заказа",
                labelsPosition: "top",
                title: "Оформление заказа",
                numOfFields: 1,
                generalBackgroundColor: "#ffffff",
                formBackgroundColor: "#a3a19f",
                formWidth: 36,
                buttWidth: 23,
                buttHeight: 6,
                formMarginTop: 7,
                textColor: "#ffffff",
                descriptionColor: "#ffffff",
                buttTextColor: "#fdfcff",
                titleColor: "#ffffff",
                buttColor: "#53c6b4"
            }
        }] as Array<dataTemplatesNumbersFieldsType>
};
type localActionsTypes = actionsTypes<typeof actions>;
export const mainReducer = (state = data, action: localActionsTypes): dataType => {
    switch (action.type) {
        case "formBackgroundColor":
            return {...state, formBackgroundColor: action.formBackgroundColor};

        case "numOfFields": {
            return {
                ...state,
                numOfFields:
                    Number(action.numOfFields) > 2
                        ? 2
                        : Number(action.numOfFields) < 1
                        ? 1
                        : Number(action.numOfFields)
            };
        }
        case "title": {
            return {...state, title: action.title};
        }
        case "buttWidth": {
            return {
                ...state,
                buttWidth:
                    Number(action.buttWidth) < 0
                        ? 0
                        : Number(action.buttWidth) > 100
                        ? 100
                        : Number(action.buttWidth)
            };
        }
        case "buttHeight": {
            return {
                ...state,
                buttHeight:
                    Number(action.buttHeight) < 0 ? 0 : Number(action.buttHeight)
            };
        }
        case "isFilterVision": {
            return {...state, isFilterVision: !state.isFilterVision};
        }
        case "FillingVision": {
            return {...state, isFillingVision: !state.isFillingVision};
        }
        case "buttColor": {
            return {...state, buttColor: action.buttColor};
        }
        case "labelsPosition": {
            return {...state, labelsPosition: action.labelsPosition};
        }
        case "changeStateOfForm": {
            return {...state, stateOfForm: !state.stateOfForm};
        }
        case "buttTextColor": {
            return {...state, buttTextColor: action.buttTextColor};
        }
        case "textColor": {
            return {...state, textColor: action.textColor};
        }
        case "generalBackgroundColor": {
            return {
                ...state,
                generalBackgroundColor: action.generalBackgroundColor
            };
        }
        case "selectedInput": {
            return {...state, selectedInput: action.selectedInput};
        }
        case "titleColor": {
            return {...state, titleColor: action.titleColor};
        }
        case "descriptionColor": {
            return {...state, descriptionColor: action.descriptionColor};
        }
        case "formWidth": {
            let newObj = JSON.parse(JSON.stringify(state));
            Number(action.formWidth) <= 0
                ? (newObj.formWidth = 1)
                : Number(action.formWidth) > 100
                ? (newObj.formWidth = 100)
                : (newObj.formWidth = action.formWidth);
            return {...newObj};
        }
        case "formMarginTop": {
            let newObj = JSON.parse(JSON.stringify(state));
            Number(action.formMarginTop) < 0
                ? (newObj.formMarginTop = 0)
                : Number(action.formMarginTop) > 500
                ? (newObj.formMarginTop = 500)
                : (newObj.formMarginTop = action.formMarginTop);
            return {...newObj};
        }
        case "deleteField": {
            let newObj = JSON.parse(JSON.stringify(state));
            delete newObj.inputs[action.index];
            return {...newObj};
        }
        case "inputs": {
            let newObj = JSON.parse(JSON.stringify(state));
            console.log(action.data["type"])
            newObj.inputs[action.index] = {
                name:
                    action.data["name"].length >= 50
                        ? action.data["name"].substr(0, 50)
                        : action.data["name"],
                placeholder:
                    action.data["type"] !== "checkbox"
                        ? action.data["placeholder"]
                        : "",

                type: action.data.type,
                fieldDescription: action.data["fieldDescription"],
                descriptionPosition: action.data["descriptionPosition"] || "inline",
                width: Number(action.data["width"]) || 20,
                height: Number(action.data["height"]) || 3
            };
            return newObj;
        }
        case "addField": {
            let newObj = JSON.parse(JSON.stringify(state));
            let keysOfInputs = Object.keys(newObj.inputs);
            if (keysOfInputs.length !== 15) {
                newObj.inputs[
                    keysOfInputs.length
                        ? Number(keysOfInputs[keysOfInputs.length - 1]) + 1
                        : 1
                    ] = {
                    name: `Поле${
                        keysOfInputs.length
                            ? Number(keysOfInputs[keysOfInputs.length - 1]) + 1
                            : 1
                    }`,
                    placeholder: "",
                    type: "text",
                    width: 20,
                    height: 3
                };
            }
            return newObj;
        }
        case "ApplyTemplate": {
            let newObj = JSON.parse(JSON.stringify(state));
            newObj.inputs = action.data.fields;
            newObj.labelsPosition = action.data.settings.labelsPosition || "top";
            newObj.title = action.data.settings.title || "Заголовок";
            newObj.numOfFields = action.data.settings.numOfFields || 1;
            newObj.titleColor = action.data.settings.titleColor || "#ffffff";
            newObj.generalBackgroundColor =
                action.data.settings.generalBackgroundColor || "#ffffff";
            newObj.descriptionColor =
                action.data.settings.descriptionColor || "#a175ff";
            newObj.formBackgroundColor =
                action.data.settings.formBackgroundColor || "#a3a19f";
            newObj.formWidth = action.data.settings.formWidth || 80;
            newObj.textColor = action.data.settings.textColor || "#ffffff";
            newObj.formMarginTop = action.data.settings.formMarginTop || 23;
            newObj.buttColor = action.data.settings.buttColor || "#a175ff";
            newObj.buttTextColor = action.data.settings.buttTextColor || "#fdfcff";
            newObj.buttHeight = action.data.settings.buttHeight || "6";
            newObj.buttWidth = action.data.settings.buttWidth || "35";
            message.success("Шаблон применен");
            return {...newObj};
        }
        case "filters": {
            let newObj = JSON.parse(JSON.stringify(state));
            let posEl: Array<string | number> = [];
            newObj.filters.forEach((e: string, i: number) => {
                if (e === action.filters) {
                    posEl = [e, i];
                }
            });
            posEl[0]
                ? newObj.filters.splice(posEl[1], 1)
                : newObj.filters.push(action.filters);
            return {...newObj};
        }
        default: {
            return {...state};
        }
    }
};
export let actions = {
    ApplyTemplateAC: (data:dataTemplatesNumbersFieldsType) => ({
        type: "ApplyTemplate",
        data: data
    }as const),
    ChangeStateOFFormAC: () => ({
        type: "changeStateOfForm"
    }as const),
    ChangeFormBackgroundColorAC: (formBackgroundColor: string) => ({
        type: "formBackgroundColor",
        formBackgroundColor
    }as const),
    ChangeButtTextColorAC: (buttTextColor: string) => ({
        type: "buttTextColor",
        buttTextColor
    }as const),
    ChangeIsFilterVision: () => ({
        type: "isFilterVision"
    }as const),
    ChangeButtColorAC: (buttColor: string) => ({
        type: "buttColor",
        buttColor
    }as const),
    ChangeGeneralBackgroundColorAC: (generalBackgroundColor: string) => ({
        type: "generalBackgroundColor",
        generalBackgroundColor
    }as const),
    ChangeAddFieldAC: () => ({
        type: "addField"
    }as const),
    ChangeInputsAC: (data: dataInputNumParamType, index: number) => ({
        type: "inputs",
        data,
        index
    }as const),
    ChangeFillingVisionAC: () => ({
        type: "FillingVision"
    }as const),
    ChangeTitleAC: (title: string) => ({
        type: "title",
        title: title
    }as const),
    ChangeSelectedInputAC: (selectedInput: string) => ({
        type: "selectedInput",
        selectedInput: selectedInput
    }as const),
    ChangeDeleteFieldAC: (index: number) => ({
        type: "deleteField",
        index: index
    }as const),
    ChangeNumOfFieldsAC: (numOfFields: string) => ({
        type: "numOfFields",
        numOfFields: numOfFields
    }as const),
    ChangeLabelsPositionAC: (labelsPosition: string) => ({
        type: "labelsPosition",
        labelsPosition: labelsPosition
    }as const),
    FiltersAC: (filters: string) => ({
        type: "filters",
        filters
    }as const),
    ChangeFormMarginTopAC: (formMarginTop: string) => ({
        type: "formMarginTop",
        formMarginTop
    }as const),
    ChangeButtHeightAC: (buttHeight: string) => ({
        type: "buttHeight",
        buttHeight
    }as const),
    ChangeButtWidthAC: (buttWidth: string) => ({
        type: "buttWidth",
        buttWidth
    }as const),
    ChangeFormWidthAC: (formWidth: string) => ({
        type: "formWidth",
        formWidth
    }as const),
    ChangeTextColorAC: (textColor: string) => ({
        type: "textColor",
        textColor
    }as const),
    ChangeDescriptionColorAC: (descriptionColor: string) => ({
        type: "descriptionColor",
        descriptionColor
    }as const),
    ChangeTitleColorAC: (titleColor: string) => ({
        type: "titleColor",
        titleColor
    }as const)
}

export type AcceptThunkAxiosType = {
    message: string
}
export let AcceptThunk = (url: string, method = "POST", body: { id: string }, headers = {}): ThunkAction<Promise<AcceptThunkAxiosType | undefined>, GlobalState, unknown, Action> => {
    return () => {
        let resp = axios
            .post(url, body)
            .then((response: AxiosResponse<AcceptThunkAxiosType>) => {
                return response.data;
            })
            .catch((er: AxiosError<AcceptThunkAxiosType>) => {
                if (er.response) {
                    return er.response.data;
                }
            });

        return resp;
    };
};
type AuthThunkAxiosType = {
    login: string,
    message: boolean,
    templates: Array<authDataType>
}
export let AuthThunk = (token?: string, templates?: Array<authDataType>, login?: string): ThunkAction<void, GlobalState, unknown, Action> => {
    return (dispatch, getState) => {
        dispatch(authActions.preloaderVisionAC(getState().authReducer.isPreloaderVision));
        if (token && login && templates) {
            localStorage.setItem("token", JSON.stringify(token));
            dispatch(authActions.isAuthAC(true, token, templates, login));
            dispatch(authActions.preloaderVisionAC(getState().authReducer.isPreloaderVision));
        } else {
            let data: any = localStorage.getItem("token");
            if (data) {
                data = data.replace(/"/g, ``);
                axios
                    .post("/api/checkToken", {token: JSON.parse(`"${data}"`)})
                    .then((res: AxiosResponse<AuthThunkAxiosType>) => {
                        dispatch(authActions.isAuthAC(res.data.message, data, res.data.templates, res.data.login));
                        dispatch(authActions.preloaderVisionAC(getState().authReducer.isPreloaderVision));
                    })
                    .catch(() => {
                        dispatch(authActions.preloaderVisionAC(getState().authReducer.isPreloaderVision));
                    });
            } else {
                dispatch(authActions.preloaderVisionAC(getState().authReducer.isPreloaderVision));
            }
        }
    };
};
export type RequestThunkResType = {
    status: number, res: { message?: string, token?: string, login?: string, templates: Array<authDataType> }
}
export let RequestThunk = (url: string, method: string = "POST", body: valuesAuthType | valuesType | valuesRegistrationType): ThunkAction<Promise<RequestThunkResType | undefined>, GlobalState, unknown, Action> => {
    return () => {
        let res =
            axios
                .post(url, body)
                .then((response: AxiosResponse<{ message?: string, token?: string, login?: string, templates: Array<authDataType> }>) => {
                    return {status: response.status, res: response.data};
                })
                .catch((er: AxiosError<any | undefined>) => {
                    if (er.response !== undefined) {
                        return {status: er.response.status, res: er.response.data};
                    } else {
                        console.log("err")
                    }
                })

        return res;
    };
};
export let SaveThunk = (data: any, token: string): ThunkAction<void, GlobalState, unknown, Action> => {
    return (dispatch: any, getState: any) => {
        if (getState().authReducer.isAuth) {
            axios
                .post("/api/saveForm", {data, token})
                .then((res) => {
                    message.success(res.data.message);
                    dispatch(authActions.userTemplatesAC(data));
                })
                .catch((err) => {
                    message.warning(err.response.data.message);
                });
        } else {
            message.warning("Для этого действия необходимо войти в аккаунт");
        }
    };
};
export let DeleteTemplateThunk = (index: number): ThunkAction<void, GlobalState, unknown, Action> => {
    return (dispatch: any, getState: any) => {
        if (getState().authReducer.isAuth) {
            axios
                .post("/api/deleteTemplate", {
                    index,
                    token: getState().authReducer.token
                })
                .then((res) => {
                    message.success(res.data.message);
                    dispatch(authActions.deleteUserTemplatesAC(index));
                })
                .catch((err) => {
                    message.warning(err.response.data.message);
                });
        } else {
            message.warning("Для этого действия необходимо войти в аккаунт");
        }
    };
};
