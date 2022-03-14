import { connect } from "react-redux";
import { PersonalTemplates } from "./personalTemplates";
import { actions } from "../../../../store/mainReducer";
import { GlobalState } from "../../../../store/store";
const MapStateToProps = (state: GlobalState) => {
  return {
    userTemplates: state.authReducer.userTemplates,
    token: state.authReducer.token,
  };
};
const PersonalTemplatesConnector = connect(MapStateToProps, {
  ApplyUserTemplateAC: actions.ApplyUserTemplateAC,
});
export const PersonalTemplatesContainer =
  PersonalTemplatesConnector(PersonalTemplates);
