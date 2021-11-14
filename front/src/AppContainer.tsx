import { connect } from "react-redux";
import { App } from "./App";
import { actions } from "./store/authReducer";
import { GlobalState } from "./store/store";

type MapStateToPropsType = {
  stateOfHeader: number;
  isFillingVision: boolean;
};
let MapStateToProps = (state: GlobalState): MapStateToPropsType => ({
  stateOfHeader: state.menuReducer.stateOfHeader,
  isFillingVision: state.mainReducer.isFillingVision,
});

export let AppContainer = connect(MapStateToProps, {
  isAuthAC: actions.isAuthAC,
})(App);
