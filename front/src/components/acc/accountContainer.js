import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import React from "react";
import { AuthContainer } from "./authContainer";
import { RegistrationContainer } from "./registrationContainer";
import { actions } from "../../store/authReducer";
let MapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.isAuth,
    loginState: state.authReducer.loginState
  };
};

let AccBlock = (props) => {
  let handler = (e) => {
    props.loginStateAC(e.target.getAttribute("name"));
  };
  return props.isAuth ? (
    <Redirect to="/"></Redirect>
  ) : (
    <div className="LogRegBlock">
      <div className="LogRegWrapper">
        <div className="LogRegTitles">
          <h3
            style={{
              color: props.loginState === "login" ? "white" : "#c2c2c2"
            }}
            name="login"
            onClick={handler}
          >
            Вход
          </h3>
          <h3
            style={{
              color: props.loginState === "registration" ? "white" : "#c2c2c2"
            }}
            name="registration"
            onClick={handler}
          >
            Регистрация
          </h3>
        </div>
        <div className="LogReg">
          {props.loginState === "login" ? (
            <>
              <AuthContainer></AuthContainer>
            </>
          ) : (
            <>
              <RegistrationContainer></RegistrationContainer>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export let AccountContainer = connect(MapStateToProps, { loginStateAC:actions.loginStateAC })(
  AccBlock
);
