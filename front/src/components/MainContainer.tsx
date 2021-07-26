import { connect } from "react-redux";
import { Main } from "./Main";
import { actions } from "../store/mainReducer";
import {GlobalState} from "../store/store";
type MapStateToPropsType={
  isFillingVision:boolean,
  generalBackgroundColor:string
}
type MapDispatchToPropsType={
  ChangeFillingVisionAC:()=>void
}
let MapStateToProps = (state:GlobalState):MapStateToPropsType => ({
  isFillingVision: state.mainReducer.isFillingVision,
  generalBackgroundColor: state.mainReducer.generalBackgroundColor
});
export let MainContainer = connect<MapStateToPropsType,MapDispatchToPropsType,{},GlobalState>(MapStateToProps, { ChangeFillingVisionAC:actions.ChangeFillingVisionAC })(
  Main
);
