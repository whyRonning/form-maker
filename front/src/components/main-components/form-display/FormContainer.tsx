import { connect, ConnectedProps } from "react-redux";
import { Form } from "./Form";
import React from "react";
import { actions } from "../../../store/mainReducer";
import { GlobalState } from "../../../store/store";
const MapStateToProps = (state: GlobalState) => ({
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
});
const FormHOC = (props: propsType) => (
  <Form changeState={props.ChangeStateOFFormAC} {...props} />
);

const FormConnector = connect(MapStateToProps, {
  ChangeStateOFFormAC: actions.ChangeStateOFFormAC,
});
type propsType = ConnectedProps<typeof FormConnector>;
export const FormContainer = FormConnector(FormHOC);
