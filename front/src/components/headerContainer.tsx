import {connect} from "react-redux";
import {Header} from "./header";
import {LogoutThunk} from "../store/authReducer";
import {GlobalState} from "../store/store";

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    LogoutThunk: () => void
}
let MapStateToProps = (state: GlobalState): MapStateToPropsType => ({
    isAuth: state.authReducer.isAuth
});
export let HeaderContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, GlobalState>(MapStateToProps, {LogoutThunk})(Header);
