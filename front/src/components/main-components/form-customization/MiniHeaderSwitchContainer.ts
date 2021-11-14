import { connect } from "react-redux";
import { stateOfHeaderAC } from "../../../store/menuReducer";
import { MiniHeaderSwitch } from "./MiniHeaderSwitch";
import { actions } from "../../../store/mainReducer";
import { GlobalState } from "../../../store/store";
let MapStateToProps = (state: GlobalState) => ({
  stateOfHeader: state.menuReducer.stateOfHeader,
  isFillingVision: state.mainReducer.isFillingVision,
  isAuth: state.authReducer.isAuth,
});
export let MiniHeaderSwitchContainer = connect(MapStateToProps, {
  stateOfHeaderAC,
  ChangeFillingVisionAC: actions.ChangeFillingVisionAC,
})(MiniHeaderSwitch);
