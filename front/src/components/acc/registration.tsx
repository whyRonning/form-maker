import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, { useState } from "react";
import { Input } from "../contact/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {valuesRegistrationType} from "./registrationContainer";
let Registrations:React.FC<InjectedFormProps<valuesRegistrationType,{}>&{}> = React.memo((props) => {
  let [passVision, SetPassVision] = useState(false);
  let handler = () => {
    SetPassVision(!passVision);
  };
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="login" type="text" component={Input} placeholder="Логин" />
      <Field name="email" type="email" component={Input} placeholder="Почта" />
      <div className="passBlock">
        <Field name="password" type={!passVision ? "text" : "password"} placeholder="Пароль" component={Input}/>
        <FontAwesomeIcon onClick={handler} icon={passVision ? "eye" : "eye-slash"}/>
      </div>
      <Field name="passwordAccess" type={!passVision ? "text" : "password"} placeholder="Введите пароль повторно" component={Input}/>
      <button type="submit">Регистрация</button>
    </form>
  );
});
export let Registration = reduxForm<valuesRegistrationType,{}>({
  form: "Registration"
})(Registrations);
