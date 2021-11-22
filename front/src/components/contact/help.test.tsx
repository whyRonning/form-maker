import { render } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { Form } from "./help";
import { MockedProvider } from "@apollo/client/testing";
import { HelpContainer } from "./helpContainer";
import { gql } from "graphql-tag";
describe("help", () => {
  it("change inputs value", () => {
    let fun = jest.fn();
    let sendMessage = jest.fn();
    let { getByPlaceholderText } = render(
      <Form
        name=""
        setName={fun}
        setMessages={fun}
        sendMessage={sendMessage}
        messages=""
        email=""
        setEmail={fun}
        loading={false}
      />
    );
    userEvent.type(getByPlaceholderText(/Ваше имя/i), "Дима");
    expect(fun.mock.calls.length).toBe(4);
  });
  it("click on butt", async () => {
    let query = gql`
      mutation sendMessage($name: String!, $email: String!, $message: String!) {
        sendMessage(name: $name, email: $email, message: $message)
      }
    `;
    let mocks = [
      {
        request: {
          query: query,
          variables: {
            name: "Alex",
            email: "alex@gmail.com",
            message: "i need help",
          },
        },
        result: { data: { sendMessage: "success" } },
      },
    ];
    let { getByRole, findByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mocks}>
        <HelpContainer />
      </MockedProvider>
    );
    userEvent.type(getByPlaceholderText(/ваше имя/i), "Alex");
    userEvent.type(getByPlaceholderText(/почта/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText(/сообщение/i), "i need help");
    userEvent.click(getByRole("button"));
    expect(await findByText("Сообщение отправлено")).toBeInTheDocument();
  });
});
