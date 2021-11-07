import React from "react";
import {Input} from "./input";
import  {valuesType} from "./helpContainer"
import {Field, InjectedFormProps, reduxForm} from "redux-form";
type props={
  disable:boolean
}
let Forms:React.FC<InjectedFormProps<valuesType,props>&props> = (props) => {
    const {handleSubmit} = props;
    return (
        <div className="HelpForm">
            <form onSubmit={handleSubmit}>
                <h1>Мы ответим вам в течение часа</h1>
                <Field name="name" className="help-input" placeholder="Ваше имя" type="text" component={Input}/>
                <Field name="email" className="help-input" placeholder="Почта" type="email" component={Input}/>
                <Field name="message" className="help-input" placeholder="Сообщение" component="textarea"/>
                <div className="CheckMessageAccept">
                    <label>Отправляя сообщение, я даю соглашение на обработку персональных данных</label>
                    <Field name="agree" component={Input} type="checkbox" checked/>
                </div>
                <button type="submit" disabled={props.disable}>Отправить</button>
            </form>
        </div>
    );
};
export let Form = reduxForm<valuesType,props>({
    form: "help"
})(Forms);
