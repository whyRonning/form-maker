import { connect, ConnectedProps } from "react-redux";
import { Header } from "./header";
import { GlobalState } from "../../store/store";
import React from "react";
import { actions as authActions } from "../../store/authReducer";
import { stateOfHeaderAC } from "../../store/menuReducer";
import { message } from "antd";
const MapStateToProps = (state: GlobalState) => ({
  isAuth: state.authReducer.isAuth,
  stateOfHeader: state.menuReducer.stateOfHeader,
});
const HeaderBlock = (props: propsType) => {
  const handler = () => {
    localStorage.removeItem("token");
    props.logoutAC();
    if (props.stateOfHeader === 3) {
      props.stateOfHeaderAC(2);
    }
    message.success("Вы вышли из аккаунта");
  };
  return <Header handler={handler} isAuth={props.isAuth} />;
};
export const HeaderConnector = connect(MapStateToProps, {
  logoutAC: authActions.logoutAC,
  stateOfHeaderAC,
});
type propsType = ConnectedProps<typeof HeaderConnector>;
export const HeaderContainer = HeaderConnector(HeaderBlock);
