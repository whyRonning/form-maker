import {connect, ConnectedProps} from "react-redux";
import { Auth } from "./auth";
import React from "react";
import {
  RequestThunk,
  AuthThunk,
  RequestThunkResType,
} from "../../store/mainReducer";
import { message } from "antd";
import { dataType as authDataType } from "../../store/authReducer";
export type valuesAuthType = {
  email: string;
  password: string;
};
let authBlock = (props:propsType) => {
  let FormReq = async (values: valuesAuthType) => {
    let data = await props.RequestThunk("/api/auth", "POST", values);
    if (data) {
      let { status, res } = data;
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
  return <Auth onSubmit={FormReq} />;
};
let AuthConnector = connect(null, { RequestThunk, AuthThunk });
type propsType=ConnectedProps<typeof AuthConnector>
export let AuthContainer = AuthConnector(authBlock);
