import {connect, ConnectedProps} from "react-redux";
import {Registration} from "./registration";
import React, {FC} from "react";
import {message} from "antd";
import {RequestThunk} from "../../store/mainReducer";

export type valuesRegistrationType = {
    login: string,
    email: string,
    password: string,
    passwordAccess: string
}
let registrationBlock= (props:propsType) => {
    let FormReq = async (values: valuesRegistrationType) => {
        let data = await props.RequestThunk("/api/registration", "POST", values);
        if (data) {
            let {status, res} = data;
            if (status === 201) {
                message.success(res.message);
            } else {
                res.message
                    ? message.error(res.message)
                    : message.error("Что-то пошло не так");
            }
        }
    };
    return <Registration onSubmit={FormReq}/>;
};
let RegistrationConnector = connect(null, {RequestThunk});
type propsType=ConnectedProps<typeof RegistrationConnector>
export let RegistrationContainer =RegistrationConnector(registrationBlock);

