import { connect, ConnectedProps } from "react-redux";
import { actions, dataInputNumParamType } from "../../../../store/mainReducer";
import { actions as authActions } from "../../../../store/authReducer";
import { SeeingFields } from "./SeeingFields";
import { DataFilling } from "./DataFilling";
import React from "react";
import { GlobalState } from "../../../../store/store";
import { gql, useMutation } from "@apollo/client";
import { message } from "antd";
import { templateFragment } from "../../../graphQl-fragments/templateFragment";
let MapStateToProps = (state: GlobalState) => {
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
    token: state.authReducer.token,
  };
};
let DataFillingBlock = (props: propsType) => {
  let [saveTemplate, { loading }] = useMutation(
    gql`
      ${templateFragment}
      mutation saveTemplate(
        $template: saveTemplateTemplatesType!
        $token: String!
      ) {
        saveTemplate(template: $template, token: $token) {
          ...template
        }
      }
    `,
    {
      refetchQueries: ["getUserData"],
      onError: () => {
        message.warn("Что-то пошло не так");
      },
      onCompleted: () => {
        message.success("Шаблон сохранен");
      },
    }
  );

  let process = (data: dataInputNumParamType, index: number) => {
    props.ChangeInputsAC(data, index);
  };
  let changeInput = (index: number | null) => {
    props.ChangeSelectedInputAC(index);
  };
  let InputsMaker = props.inputs.map((val, i) => (
    <SeeingFields
      changeInput={changeInput}
      inputs={props.inputs[i]}
      index={i}
      ChangeDeleteFieldAC={props.ChangeDeleteFieldAC}
      key={i}
    />
  ));
  return (
    <DataFilling
      generalBackgroundColor={props.generalBackgroundColor}
      formBackgroundColor={props.formBackgroundColor}
      saveTemplate={saveTemplate}
      titleColor={props.titleColor}
      descriptionColor={props.descriptionColor}
      textColor={props.textColor}
      buttColor={props.buttColor}
      buttTextColor={props.buttTextColor}
      formMarginTop={props.formMarginTop}
      formWidth={props.formWidth}
      changeState={props.ChangeStateOFFormAC}
      changeInput={changeInput}
      buttHeight={props.buttHeight}
      buttWidth={props.buttWidth}
      numOfFields={props.numOfFields}
      process={process}
      loading={loading}
      selectedInput={props.selectedInput}
      inputs={props.inputs}
      title={props.title}
      labelsPosition={props.labelsPosition}
      InputsMaker={InputsMaker}
      ChangeAddFieldAC={props.ChangeAddFieldAC}
      ChangeButtColorAC={props.ChangeButtColorAC}
      ChangeButtHeightAC={props.ChangeButtHeightAC}
      ChangeButtTextColorAC={props.ChangeButtTextColorAC}
      ChangeButtWidthAC={props.ChangeButtWidthAC}
      ChangeDescriptionColorAC={props.ChangeDescriptionColorAC}
      ChangeFormBackgroundColorAC={props.ChangeFormBackgroundColorAC}
      ChangeFormMarginTopAC={props.ChangeFormMarginTopAC}
      ChangeFormWidthAC={props.ChangeFormWidthAC}
      ChangeGeneralBackgroundColorAC={props.ChangeGeneralBackgroundColorAC}
      ChangeLabelsPositionAC={props.ChangeLabelsPositionAC}
      ChangeNumOfFieldsAC={props.ChangeNumOfFieldsAC}
      ChangeTextColorAC={props.ChangeTextColorAC}
      ChangeTitleAC={props.ChangeTitleAC}
      ChangeTitleColorAC={props.ChangeTitleColorAC}
      token={props.token}
    />
  );
};

let DataFillingConnector = connect(MapStateToProps, {
  ChangeStateOFFormAC: actions.ChangeStateOFFormAC,
  ChangeAddFieldAC: actions.ChangeAddFieldAC,
  ChangeSelectedInputAC: actions.ChangeSelectedInputAC,
  ChangeInputsAC: actions.ChangeInputsAC,
  ChangeLabelsPositionAC: actions.ChangeLabelsPositionAC,
  userTemplatesAC: authActions.userTemplatesAC,
  ChangeDeleteFieldAC: actions.ChangeDeleteFieldAC,
  ChangeNumOfFieldsAC: actions.ChangeNumOfFieldsAC,
  ChangeTitleAC: actions.ChangeTitleAC,
  ChangeButtHeightAC: actions.ChangeButtHeightAC,
  ChangeButtWidthAC: actions.ChangeButtWidthAC,
  ChangeFormBackgroundColorAC: actions.ChangeFormBackgroundColorAC,
  ChangeGeneralBackgroundColorAC: actions.ChangeGeneralBackgroundColorAC,
  ChangeTextColorAC: actions.ChangeTextColorAC,
  ChangeButtTextColorAC: actions.ChangeButtTextColorAC,
  ChangeDescriptionColorAC: actions.ChangeDescriptionColorAC,
  ChangeTitleColorAC: actions.ChangeTitleColorAC,
  ChangeButtColorAC: actions.ChangeButtColorAC,
  ChangeFormMarginTopAC: actions.ChangeFormMarginTopAC,
  ChangeFormWidthAC: actions.ChangeFormWidthAC,
});
type propsType = ConnectedProps<typeof DataFillingConnector>;
export let DataFillingContainer = DataFillingConnector(DataFillingBlock);
