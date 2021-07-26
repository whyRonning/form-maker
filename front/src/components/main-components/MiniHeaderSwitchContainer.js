import { connect } from "react-redux";
import { stateOfHeaderAC } from "../../store/menuReducer";
import { MiniHeaderSwitch } from "./MiniHeaderSwitch";
import { actions } from "../../store/mainReducer";
let MapStateToProps = (state) => ({
  stateOfHeader: state.menuReducer.stateOfHeader,
  isFillingVision: state.mainReducer.isFillingVision,
  isAuth: state.authReducer.isAuth
});
export let MiniHeaderSwitchContainer = connect(MapStateToProps, {
  stateOfHeaderAC,
  ChangeFillingVisionAC:actions.ChangeFillingVisionAC
})(MiniHeaderSwitch);
