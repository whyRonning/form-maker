import { connect, ConnectedProps } from "react-redux";
import { Form } from "./Form";
import React from "react";
import { actions } from "../../../store/mainReducer";
import { GlobalState } from "../../../store/store";
let MapStateToProps = (state: GlobalState) => {
  return {
    generalBackgroundColor: state.mainReducer.generalBackgroundColor,
    inputs: state.mainReducer.inputs,
    numOfFields: state.mainReducer.numOfFields,
    buttHeight: state.mainReducer.buttHeight,
    buttWidth: state.mainReducer.buttWidth,
    formBackgroundColor: state.mainReducer.formBackgroundColor,
    textColor: state.mainReducer.textColor,
    buttTextColor: state.mainReducer.buttTextColor,
    buttColor: state.mainReducer.buttColor,
    stateOfForm: state.mainReducer.stateOfForm,
    title: state.mainReducer.title,
    titleColor: state.mainReducer.titleColor,
    descriptionColor: state.mainReducer.descriptionColor,
    formWidth: state.mainReducer.formWidth,
    formMarginTop: state.mainReducer.formMarginTop,
    labelsPosition: state.mainReducer.labelsPosition,
  };
};
let FormHOC = (props: propsType) => {
  return <Form changeState={props.ChangeStateOFFormAC} {...props} />;
};

let FormConnector = connect(MapStateToProps, {
  ChangeStateOFFormAC: actions.ChangeStateOFFormAC,
});
type propsType = ConnectedProps<typeof FormConnector>;
export let FormContainer = FormConnector(FormHOC);
