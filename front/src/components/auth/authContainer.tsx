import { Auth } from "./auth";
import { gql, useLazyQuery } from "@apollo/client";
import { templateFragment } from "../graphQl-fragments/templateFragment";
import { message } from "antd";
import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { actions } from "../../store/authReducer";
import { Preloader } from "../preloader/preloader";
export const AuthBlock = (props: propsType) => {
  const [passVision, setPassVision] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formRes, { loading }] = useLazyQuery(
    gql`
      ${templateFragment}
      query auth($email: String!, $password: String!) {
        auth(email: $email, password: $password) {
          token
          templates {
            ...template
          }
        }
      }
    `,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", JSON.stringify(data.auth.token));
        message.success("Вы вошли в аккаунт");
        props.isAuthAC(true, data.auth.templates, data.auth.token);
      },
      onError: (err) => {
        message.warn(
          err.message === "data"
            ? "Неверно введен логин или пароль"
            : err.message === "acc not accept"
            ? "Аккаунт не подтвержден"
            : "Что-то пошло не так"
        );
      },
    }
  );
  if (loading) return <Preloader />;
  return (
    <Auth
      email={email}
      password={password}
      setPassword={setPassword}
      setEmail={setEmail}
      passVision={passVision}
      setPassVision={setPassVision}
      formRes={formRes}
    />
  );
};
const AuthConnector = connect(null, { isAuthAC: actions.isAuthAC });
type propsType = ConnectedProps<typeof AuthConnector>;
export const AuthContainer = AuthConnector(AuthBlock);
