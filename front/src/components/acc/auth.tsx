import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, { useState } from "react";
import { Input } from "../contact/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {valuesAuthType} from "./authContainer";
let Auths:React.FC<InjectedFormProps<valuesAuthType,{}>&{}> = React.memo((props) => {
  let [passVision, SetPassVision] = useState(false);
  let handler = () => {
    SetPassVision(!passVision);
  };
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field placeholder="Почта" name="email" type="email" component={Input} />
      <div className="passBlock">
        <Field placeholder="Пароль" name="password" type={!passVision ? "text" : "password"} component={Input}/>
        <FontAwesomeIcon onClick={handler} icon={passVision ? "eye" : "eye-slash"}/>
      </div>
      <button type="submit">Войти</button>
    </form>
  );
});
export let Auth = reduxForm<valuesAuthType,{}>({
  form: "Auth"
})(Auths);
