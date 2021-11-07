import {connect, ConnectedProps} from "react-redux";
import { Redirect } from "react-router-dom";
import React from "react";
import { AuthContainer } from "../auth/authContainer";
import { RegistrationContainer } from "../registration/registrationContainer";
import { actions } from "../../store/authReducer";
import {GlobalState} from "../../store/store";
type MSTPTYPE={
  isAuth:boolean,
  loginState:string
}
let MapStateToProps = (state:GlobalState):MSTPTYPE => {
  return {
    isAuth: state.authReducer.isAuth,
    loginState: state.authReducer.loginState,
  };
};

let AccBlock = (props:propsType) => {
  return props.isAuth ? (
    <Redirect to="/" />
  ) : (
    <div className="LogRegBlock">
      <div className="LogRegWrapper">
        <div className="LogRegTitles">
          <h3
            style={{
              color: props.loginState === "login" ? "white" : "#c2c2c2",
            }}
            onClick={()=>{props.loginStateAC("login")}}
          >
            Вход
          </h3>
          <h3
            style={{
              color: props.loginState === "registration" ? "white" : "#c2c2c2",
            }}
            onClick={()=>{props.loginStateAC("registration")}}
          >
            Регистрация
          </h3>
        </div>
        <div className="LogReg">
          {props.loginState === "login" ? (
            <>
              <AuthContainer />
            </>
          ) : (
            <>
              <RegistrationContainer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
let AccountConnector = connect(MapStateToProps, {
  loginStateAC: actions.loginStateAC,
});
type propsType=ConnectedProps<typeof AccountConnector>
export let AccountContainer = AccountConnector(AccBlock);
