import React from "react";
type propsType = {
  name: string;
  email: string;
  messages: string;
  loading: boolean;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setMessages: (message: string) => void;
  sendMessage: (obj: {
    variables: { name: string; email: string; message: string };
  }) => void;
};
export let Form = (props: propsType) => {
  return (
    <div className="HelpForm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.sendMessage({
            variables: {
              name: props.name,
              email: props.email,
              message: props.messages,
            },
          });
        }}
      >
        <h1>Мы ответим вам в течение часа</h1>
        <input
          className="help-input"
          value={props.name}
          onChange={(e) => {
            props.setName(e.currentTarget.value);
          }}
          placeholder="Ваше имя"
          type="text"
          required
        />
        <input
          className="help-input"
          value={props.email}
          onChange={(e) => {
            props.setEmail(e.currentTarget.value);
          }}
          placeholder="Почта"
          type="email"
          required
        />
        <textarea
          className="help-input"
          value={props.messages}
          onChange={(e) => {
            props.setMessages(e.currentTarget.value);
          }}
          placeholder="Сообщение"
          required
        />
        <div className="CheckMessageAccept">
          <label>
            Отправляя сообщение, я даю соглашение на обработку персональных
            данных
          </label>
          <input name="agree" type="checkbox" required />
        </div>
        <button type="submit" disabled={props.loading}>
          Отправить
        </button>
      </form>
    </div>
  );
};
