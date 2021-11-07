import { connect } from "react-redux";
import { PersonalTemplates } from "./personalTemplates";
import { actions, DeleteTemplateThunk } from "../../../../store/mainReducer";
import React from "react";
let MapStateToProps = (state) => {
  return {
    state: state.mainReducer,
    userTemplates: state.authReducer.userTemplates,
  };
};
let PersonalTemplatess = (props) => {
  return (
    <>
      <PersonalTemplates {...props} />
    </>
  );
};
export let PersonalTemplatesContainer = connect(MapStateToProps, {
  ApplyTemplateAC: actions.ApplyTemplateAC,
  DeleteTemplateThunk,
})(PersonalTemplatess);
