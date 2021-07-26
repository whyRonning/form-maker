import { connect } from "react-redux";
import {
    actions, SaveThunk
} from "../../store/mainReducer";
import { actions as authActions} from "../../store/authReducer";
import { SeeingFields } from "./SeeingFields";
import { DataFilling } from "./DataFilling";
import React from "react";
let MapStateToProps = (state) => {
  return {
    state: state.mainReducer,
    formBackgroundColor: state.mainReducer.formBackgroundColor,
    titleColor: state.mainReducer.titleColor,
    descriptionColor: state.mainReducer.descriptionColor,
    generalBackgroundColor: state.mainReducer.generalBackgroundColor,
    buttHeight: state.mainReducer.buttHeight,
    buttWidth: state.mainReducer.buttWidth,
    numOfFields: state.mainReducer.numOfFields,
    inputs: state.mainReducer.inputs,
    textColor: state.mainReducer.textColor,
    labelsPosition: state.mainReducer.labelsPosition,
    isFillingVision: state.mainReducer.isFillingVision,
    buttTextColor: state.mainReducer.buttTextColor,
    buttColor: state.mainReducer.buttColor,
    title: state.mainReducer.title,
    formWidth: state.mainReducer.formWidth,
    formMarginTop: state.mainReducer.formMarginTop,
    selectedInput: state.mainReducer.selectedInput,
    isAuth: state.authReducer.isAuth,
    token: state.authReducer.token
  };
};

let DataFillingBlock = (props) => {
  let check = (e) => {
    e.target.name === "title"
      ? props.ChangeTitleAC(e.target.value)
      : e.target.name === "numOfFields"
      ? props.ChangeNumOfFieldsAC(e.target.value)
      : e.target.name === "labelsPosition"
      ? props.ChangeLabelsPositionAC(e.target.value)
      : e.target.name === "generalBackgroundColor"
      ? props.ChangeGeneralBackgroundColorAC(e.target.value)
      : e.target.name === "formBackgroundColor"
      ? props.ChangeFormBackgroundColorAC(e.target.value)
      : e.target.name === "buttColor"
      ? props.ChangeButtColorAC(e.target.value)
      : e.target.name === "buttTextColor"
      ? props.ChangeButtTextColorAC(e.target.value)
      : e.target.name === "formWidth"
      ? props.ChangeFormWidthAC(e.target.value)
      : e.target.name === "formMarginTop"
      ? props.ChangeFormMarginTopAC(e.target.value)
      : e.target.name === "titleColor"
      ? props.ChangeTitleColorAC(e.target.value)
      : e.target.name === "descriptionColor"
      ? props.ChangeDescriptionColorAC(e.target.value)
      : e.target.name === "buttTextColor"
      ? props.ChangeButtTextColorAC(e.target.value)
      : e.target.name === "textColor"
      ? props.ChangeTextColorAC(e.target.value)
      : e.target.name === "buttHeight"
      ? props.ChangeButtHeightAC(e.target.value)
      : e.target.name === "buttWidth"
      ? props.ChangeButtWidthAC(e.target.value)
      : props.ChangeAddFieldAC();
  };
  let process = (data, index) => {
    props.ChangeInputsAC(data, index);
  };
  let changeInput = (index) => {
    props.ChangeSelectedInputAC(index);
  };
  let saveFormHandler = async () => {
    let data = {
      generalBackgroundColor: props.generalBackgroundColor,
      formBackgroundColor: props.formBackgroundColor,
      titleColor: props.titleColor,
      descriptionColor: props.descriptionColor,
      formWidth: props.formWidth,
      formMarginTop: props.formMarginTop,
      buttHeight: props.buttHeight,
      buttWidth: props.buttWidth,
      textColor: props.textColor,
      buttColor: props.buttColor,
      buttTextColor: props.buttTextColor,
      title: props.title,
      labelsPosition: props.labelsPosition,
      numOfFields: props.numOfFields,
      inputs: props.inputs
    };
    props.SaveThunk(data, props.token);
  };
  let inputsKeys = Object.keys(props.inputs);

  let InputsMaker = inputsKeys.map((val, i) => (
    <SeeingFields
      changeInput={changeInput}
      inputs={props.inputs[inputsKeys[i]]}
      index={inputsKeys[i]}
      ChangeDeleteFieldAC={props.ChangeDeleteFieldAC}
      key={i}
    />
  ));
  return (
    <DataFilling
      generalBackgroundColor={props.generalBackgroundColor}
      formBackgroundColor={props.formBackgroundColor}
      titleColor={props.titleColor}
      descriptionColor={props.descriptionColor}
      textColor={props.textColor}
      buttColor={props.buttColor}
      buttTextColor={props.buttTextColor}
      formMarginTop={props.formMarginTop}
      formWidth={props.formWidth}
      ChangeFillingVisionAC={props.ChangeFillingVisionAC}
      changeState={props.ChangeStateOFFormAC}
      changeInput={changeInput}
      check={check}
      buttHeight={props.buttHeight}
      buttWidth={props.buttWidth}
      saveFormHandler={saveFormHandler}
      numOfFields={props.numOfFields}
      process={process}
      selectedInput={props.selectedInput}
      inputs={props.inputs}
      isFillingVision={props.isFillingVision}
      title={props.title}
      labelsPosition={props.labelsPosition}
      InputsMaker={InputsMaker}
    />
  );
};

export let DataFillingContainer = connect(MapStateToProps, {
  ChangeFillingVisionAC:actions.ChangeFillingVisionAC,
  ChangeStateOFFormAC:actions.ChangeStateOFFormAC,
  ChangeAddFieldAC:actions.ChangeAddFieldAC,
  ChangeSelectedInputAC:actions.ChangeSelectedInputAC,
  ChangeInputsAC:actions.ChangeInputsAC,
  ChangeLabelsPositionAC:actions.ChangeLabelsPositionAC,
  userTemplatesAC:authActions.userTemplatesAC,
  SaveThunk,
  ChangeDeleteFieldAC:actions.ChangeDeleteFieldAC,
  ChangeNumOfFieldsAC:actions.ChangeNumOfFieldsAC,
  ChangeTitleAC:actions.ChangeTitleAC,
  ChangeButtHeightAC:actions.ChangeButtHeightAC,
  ChangeButtWidthAC:actions.ChangeButtWidthAC,
  ChangeFormBackgroundColorAC:actions.ChangeFormBackgroundColorAC,
  ChangeGeneralBackgroundColorAC:actions.ChangeGeneralBackgroundColorAC,
  ChangeTextColorAC:actions.ChangeTextColorAC,
  ChangeButtTextColorAC:actions.ChangeButtTextColorAC,
  ChangeDescriptionColorAC:actions.ChangeDescriptionColorAC,
  ChangeTitleColorAC:actions.ChangeTitleColorAC,
  ChangeButtColorAC:actions.ChangeButtColorAC,
  ChangeFormMarginTopAC:actions.ChangeFormMarginTopAC,
  ChangeFormWidthAC:actions.ChangeFormWidthAC
})(DataFillingBlock);
