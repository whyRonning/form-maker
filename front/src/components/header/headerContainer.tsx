import { connect } from "react-redux";
import { Header } from "./header";
import { LogoutThunk } from "../../store/authReducer";
import { GlobalState } from "../../store/store";

type MapStateToPropsType = {
  isAuth: boolean;
};
let MapStateToProps = (state: GlobalState): MapStateToPropsType => ({
  isAuth: state.authReducer.isAuth,
});
export let HeaderContainer = connect(MapStateToProps, { LogoutThunk })(Header);
