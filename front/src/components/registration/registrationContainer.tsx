import { gql, useLazyQuery } from "@apollo/client";
import { message } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "../../store/authReducer";
import { Preloader } from "../preloader/preloader";
import { Registration } from "./registration";
export const RegBlock = () => {
  const [passVision, setPassVision] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAccess, setPasswordAccess] = useState("");
  const [regFun, { loading }] = useLazyQuery(
    gql`
      query reg($email: String!, $password: String!, $passwordAccess: String!) {
        reg(email: $email, password: $password, passwordAccess: $passwordAccess)
      }
    `,
    {
      onCompleted: () => {
        message.success(
          "Необходимо подтверждение аккаунта. Вам на почту отправлено письмо."
        );
      },
      onError: (err) =>
        message.warn(
          err.message === "not enough data"
            ? "Не все данные были введены"
            : err.message === "acc already created"
            ? "Аккаунт уже создан"
            : err.message === "Password mismatch"
            ? "Пароли не совпадают"
            : "Что-то пошло не так"
        ),
    }
  );
  if (loading) return <Preloader />;
  return (
    <Registration
      email={email}
      password={password}
      setPassword={setPassword}
      setEmail={setEmail}
      passVision={passVision}
      setPassVision={setPassVision}
      setPasswordAccess={setPasswordAccess}
      passwordAccess={passwordAccess}
      regFun={regFun}
    />
  );
};
export const RegistrationContainer = connect(null, {
  isAuthAC: actions.isAuthAC,
})(RegBlock);
