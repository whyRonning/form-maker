import {connect, ConnectedProps} from "react-redux";
import { PersonalTemplates } from "./personalTemplates";
import { actions, DeleteTemplateThunk } from "../../../../store/mainReducer";
import React from "react";
import {GlobalState} from "../../../../store/store";
let MapStateToProps = (state:GlobalState) => {
  return {
    userTemplates: state.authReducer.userTemplates,
  };
};
let PersonalTemplatess = (props:propsType) => {
  return (
    <>
      <PersonalTemplates {...props} />
    </>
  );
};
let PersonalTemplatesConnector = connect(MapStateToProps, {
  ApplyTemplateAC: actions.ApplyTemplateAC,
  DeleteTemplateThunk,
});
type propsType=ConnectedProps<typeof PersonalTemplatesConnector>
export let PersonalTemplatesContainer =PersonalTemplatesConnector(PersonalTemplatess);
