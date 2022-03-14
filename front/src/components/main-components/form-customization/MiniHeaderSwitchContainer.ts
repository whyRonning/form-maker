import { connect } from "react-redux";
import { stateOfHeaderAC } from "../../../store/menuReducer";
import { MiniHeaderSwitch } from "./MiniHeaderSwitch";
import { actions } from "../../../store/mainReducer";
import { GlobalState } from "../../../store/store";
const MapStateToProps = (state: GlobalState) => ({
  stateOfHeader: state.menuReducer.stateOfHeader,
  isFillingVision: state.mainReducer.isFillingVision,
  isAuth: state.authReducer.isAuth,
});
export const MiniHeaderSwitchContainer = connect(MapStateToProps, {
  stateOfHeaderAC,
  ChangeFillingVisionAC: actions.ChangeFillingVisionAC,
})(MiniHeaderSwitch);
