import {connect} from "react-redux";
import {Auth} from "./auth";
import React, {FC} from "react";
import {RequestThunk, AuthThunk, RequestThunkResType} from "../../store/mainReducer";
import {message} from "antd";
import {dataType as authDataType} from "../../store/authReducer";
export type valuesAuthType={
    email:string,
    password:string
}
export type valuesRegistrationType={
    RequestThunk:(url:string,method:string,body:valuesAuthType)=>Promise<RequestThunkResType|undefined>,
    AuthThunk:(token?: string, templates?: Array<authDataType>, login?: string)=>void
}
let authBlock:FC<valuesRegistrationType> = (props) => {
    let FormReq = async (values:valuesAuthType) => {
        let data = await props.RequestThunk("/api/auth", "POST", values);
        if(data) {
            let {status,res} = data;
            if (status === 200) {
                message.success("Вы вошли");
                await props.AuthThunk(res.token, res.templates, res.login);
            } else {
                res.message
                    ? message.error(res.message)
                    : message.error("Что-то пошло не так");
            }
        }
    };
    return <Auth onSubmit={FormReq}/>;
};
export let AuthContainer = connect(null, {RequestThunk, AuthThunk})(
    authBlock
);
