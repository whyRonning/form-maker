import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type propsType = {
  formRes: (obj: { variables: { [key: string]: any } }) => void;
  setPassVision: (passVision: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  passVision: boolean;
  password: string;
  email: string;
};
export const Auth = (props: propsType) => {
  const handler = () => {
    props.setPassVision(!props.passVision);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.formRes({
            variables: { email: props.email, password: props.password },
          });
        }}
      >
        <input
          type="text"
          value={props.email}
          onChange={(e) => {
            props.setEmail(e.currentTarget.value);
          }}
          placeholder="Почта"
          required
        />
        <div className="passBlock">
          <input
            type={props.passVision ? "text" : "password"}
            value={props.password}
            onChange={(e) => {
              props.setPassword(e.currentTarget.value);
            }}
            placeholder="Пароль"
            required
          />
          <FontAwesomeIcon
            title={!props.passVision ? "Показать пароль" : "Скрыть пароль"}
            onClick={handler}
            icon={props.passVision ? "eye" : "eye-slash"}
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </>
  );
};
