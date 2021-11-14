import {dataType as authDataType} from "./authReducer"
import {message} from "antd";
import {actionsTypes} from "./store";
import {templates} from "./initialTemplates";

/***********************types of inputs*******************************/
export type dataInputNumParamType = {
    name: string,
    placeholder: string,
    type: string,
    width: number,
    height: number,
    fieldDescription: string,
    descriptionPosition: "inline" | "bottom",
}
/***********************type of default templates*******************************/
export type dataTemplatesNumbersFieldsType = {
    fields: Array<dataInputNumParamType>,
    settings: dataTemplatesSettingsType
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
    selectedInput: null as null|number,
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
    inputs: [
         {
            name: "Поле1",
            placeholder: "",
            type: "text",
            width: 20,
            height: 3,
            fieldDescription: "",
            descriptionPosition: "inline"
        },
        {
            name: "Поле2",
            placeholder: "",
            type: "text",
            width: 20,
            height: 3,
            fieldDescription: "",
            descriptionPosition: "inline"
        }
    ] as Array<dataInputNumParamType>,
    isFilterVision: false,
    filters: [] as Array<string>,
    templates: templates as Array<dataTemplatesNumbersFieldsType>
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
        case "ApplyUserTemplate": {
            let newObj = JSON.parse(JSON.stringify(state));
            newObj.inputs = action.data.inputs;
            newObj.labelsPosition = action.data.labelsPosition || "top";
            newObj.title = action.data.title || "Заголовок";
            newObj.numOfFields = action.data.numOfFields || 1;
            newObj.titleColor = action.data.titleColor || "#ffffff";
            newObj.generalBackgroundColor =
                action.data.generalBackgroundColor || "#ffffff";
            newObj.descriptionColor =
                action.data.descriptionColor|| "#a175ff";
            newObj.formBackgroundColor =
                action.data.formBackgroundColor || "#a3a19f";
            newObj.formWidth = action.data.formWidth || 80;
            newObj.textColor = action.data.textColor || "#ffffff";
            newObj.formMarginTop = action.data.formMarginTop || 23;
            newObj.buttColor = action.data.buttColor || "#a175ff";
            newObj.buttTextColor = action.data.buttTextColor || "#fdfcff";
            newObj.buttHeight = action.data.buttHeight || "6";
            newObj.buttWidth = action.data.buttWidth || "35";
            message.success("Шаблон применен");
            return {...newObj};
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
                action.data.settings.descriptionColor|| "#a175ff";
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
    ApplyUserTemplateAC: (data:authDataType) => ({
        type: "ApplyUserTemplate",
        data: data
    }as const),
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
    ChangeSelectedInputAC: (selectedInput: number|null) => ({
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
};