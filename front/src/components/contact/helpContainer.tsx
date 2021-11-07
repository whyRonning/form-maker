import React, { FC, useState } from "react";
import { Form } from "./help";
import { message } from "antd";
import { connect } from "react-redux";
import { RequestThunk, RequestThunkResType } from "../../store/mainReducer";

export type propsHelp = {
  RequestThunk: (
    url: string,
    method: string,
    body: valuesType
  ) => Promise<RequestThunkResType | undefined>;
};
export type valuesType = {
  name: string;
  message: string;
  email: string;
};
export let HelpBlock: FC<propsHelp> = (props) => {
  let [disable, setDisable] = useState(false);
  let reqFromForm = async (values: valuesType) => {
    setDisable(!disable);
    let data = await props.RequestThunk("/api/message", "POST", values);
    setDisable(disable);
    if (data) {
      let { status, res } = data;
      status === 201
        ? message.success(res.message)
        : message.warning(res.message);
    }
  };
  return (
    <>
      <Form disable={disable} onSubmit={reqFromForm} />
    </>
  );
};

export let HelpContainer = connect(null, { RequestThunk })(HelpBlock);
