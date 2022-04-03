import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type propsType = {
  setPassVision: (passVision: boolean) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setPasswordAccess: (passwordAccess: string) => void;
  passwordAccess: string;
  passVision: boolean;
  password: string;
  email: string;
  regFun: (obj: { variables: { [key: string]: any } }) => void;
};
export const Registration = (props: propsType) => {
  const handler = () => {
    props.setPassVision(!props.passVision);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.regFun({
          variables: {
            email: props.email,
            password: props.password,
            passwordAccess: props.passwordAccess,
          },
        });
      }}
    >
      <input
        type="email"
        placeholder="Почта"
        value={props.email}
        onChange={(e) => {
          props.setEmail(e.currentTarget.value);
        }}
        required
      />
      <div className="passBlock">
        <input
          type={props.passVision ? "text" : "password"}
          value={props.password}
          placeholder="Пароль"
          onChange={(e) => {
            props.setPassword(e.currentTarget.value);
          }}
          required
        />
        <FontAwesomeIcon
          onClick={handler}
          title={!props.passVision ? "Показать пароль" : "Скрыть пароль"}
          icon={props.passVision ? "eye" : "eye-slash"}
        />
      </div>
      <input
        type={props.passVision ? "text" : "password"}
        value={props.passwordAccess}
        placeholder="Введите пароль повторно"
        onChange={(e) => {
          props.setPasswordAccess(e.currentTarget.value);
        }}
        required
      />
      <button type={"submit"}>Регистрация</button>
    </form>
  );
};
