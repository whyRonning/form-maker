import { connect, ConnectedProps } from "react-redux";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import { GlobalState } from "../../store/store";
import { AuthContainer } from "../auth/authContainer";
import { RegistrationContainer } from "../registration/registrationContainer";

const MapStateToProps = (state: GlobalState) => {
  return {
    isAuth: state.authReducer.isAuth,
  };
};
const AccBlock = (props: propsType) => {
  const [loginState, setLoginState] = useState("login");
  return props.isAuth ? (
    <Navigate to="/" />
  ) : (
    <div className="LogRegBlock">
      <div className="LogRegWrapper">
        <div className="LogRegTitles">
          <h3
            style={{
              color: loginState === "login" ? "white" : "#c2c2c2",
            }}
            onClick={() => {
              setLoginState("login");
            }}
          >
            Вход
          </h3>
          <h3
            style={{
              color: loginState === "registration" ? "white" : "#c2c2c2",
            }}
            onClick={() => {
              setLoginState("registration");
            }}
          >
            Регистрация
          </h3>
        </div>
        <div className="LogReg">
          {loginState === "login" ? (
            <AuthContainer />
          ) : (
            <RegistrationContainer />
          )}
        </div>
      </div>
    </div>
  );
};
const AccountConnector = connect(MapStateToProps);
type propsType = ConnectedProps<typeof AccountConnector>;
export const AccountContainer = AccountConnector(AccBlock);
