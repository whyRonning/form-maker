import {connect} from "react-redux";
import {Registration} from "./registration";
import React, {FC} from "react";
import {message} from "antd";
import {RequestThunk, RequestThunkResType} from "../../store/mainReducer";

export type valuesRegistrationType = {
    login: string,
    email: string,
    password: string,
    passwordAccess: string
}
export type propsRegistration = {
    RequestThunk: (url: string, method: string, body: valuesRegistrationType) => Promise<RequestThunkResType | undefined>
}
let registrationBlock: FC<propsRegistration> = (props) => {
    let FormReq = async (values: valuesRegistrationType) => {
        let data = await props.RequestThunk("/api/registration", "POST", values);
        if (data) {
            let {status, res} = data
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
export let RegistrationContainer = connect(null, {RequestThunk})(
    registrationBlock
);
