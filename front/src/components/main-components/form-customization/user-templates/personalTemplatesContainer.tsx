import { connect } from "react-redux";
import { PersonalTemplates } from "./personalTemplates";
import { actions } from "../../../../store/mainReducer";
import { GlobalState } from "../../../../store/store";
let MapStateToProps = (state: GlobalState) => {
  return {
    userTemplates: state.authReducer.userTemplates,
    token: state.authReducer.token,
  };
};
let PersonalTemplatesConnector = connect(MapStateToProps, {
  ApplyUserTemplateAC: actions.ApplyUserTemplateAC,
});
export let PersonalTemplatesContainer =
  PersonalTemplatesConnector(PersonalTemplates);
