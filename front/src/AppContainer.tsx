import {connect} from "react-redux";
import {App} from "./App";
import {AuthThunk} from "./store/mainReducer";
import {GlobalState} from "./store/store";
import {dataType as authDataType} from "./store/authReducer";

type MapStateToPropsType = {
    stateOfHeader: number,
    isFillingVision: boolean
}
type MapDispatchToPropsType = {
    AuthThunk:(token?: string, templates?: Array<authDataType>, login?: string)=>void
}
let MapStateToProps = (state: GlobalState):MapStateToPropsType => ({
    stateOfHeader: state.menuReducer.stateOfHeader,
    isFillingVision: state.mainReducer.isFillingVision
});

export let AppContainer = connect<MapStateToPropsType,MapDispatchToPropsType,{},GlobalState>(MapStateToProps, {
    AuthThunk
})(App);
