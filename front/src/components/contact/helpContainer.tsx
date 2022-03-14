import React, { useState } from "react";
import { Form } from "./help";
import { message } from "antd";
import { gql, useMutation } from "@apollo/client";

export const HelpContainer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState("");
  const [sendMessage, { loading }] = useMutation(
    gql`
      mutation sendMessage($name: String!, $email: String!, $message: String!) {
        sendMessage(name: $name, email: $email, message: $message)
      }
    `,
    {
      onCompleted: () => {
        message.success("Сообщение отправлено");
      },
      onError: (error) => {
        message.warn(
          error.message === "data"
            ? "Не все данные были введены"
            : "Что-то пошло не так"
        );
      },
    }
  );
  return (
    <Form
      setEmail={setEmail}
      email={email}
      loading={loading}
      name={name}
      messages={messages}
      sendMessage={sendMessage}
      setMessages={setMessages}
      setName={setName}
    />
  );
};
