import { GraphQLError } from "graphql";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../store/authReducer";
import { MockedProvider } from "@apollo/client/testing";
import "../../accets/FAIcons";
import React from "react";
import { gql } from "graphql-tag";
import userEvent from "@testing-library/user-event";
import { RegistrationContainer } from "./registrationContainer";
let registrationGQL = gql`
  query reg($email: String!, $password: String!, $passwordAccess: String!) {
    reg(email: $email, password: $password, passwordAccess: $passwordAccess)
  }
`;
let mocks = [
  {
    request: {
      query: registrationGQL,
      variables: {
        email: "alex@gmail.com",
        password: "12",
        passwordAccess: "12",
      },
    },
    result: {
      data: {
        reg: {
          message: "success",
        },
      },
    },
  },
  {
    request: {
      query: registrationGQL,
      variables: {
        email: "",
        password: "12",
        passwordAccess: "12",
      },
    },
    result: { errors: [new GraphQLError("not enough data")] },
  },
  {
    request: {
      query: registrationGQL,
      variables: {
        email: "alexey@gmail.com",
        password: "12",
        passwordAccess: "12",
      },
    },
    result: { errors: [new GraphQLError("acc already created")] },
  },
  {
    request: {
      query: registrationGQL,
      variables: {
        email: "alex@gmail.com",
        password: "123",
        passwordAccess: "12",
      },
    },
    result: { errors: [new GraphQLError("Password mismatch")] },
  },
];
let renderWithRedux = (state: { [key: string]: any } = {}) => {
  return {
    ...render(
      <BrowserRouter>
        <Provider
          store={createStore(combineReducers({ authReducer }), {
            authReducer: state,
          })}
        >
          <MockedProvider mocks={mocks}>
            <RegistrationContainer />
          </MockedProvider>
        </Provider>
      </BrowserRouter>
    ),
  };
};
describe("registration", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  it("render", () => {
    let { getByText } = renderWithRedux();
    expect(getByText("Регистрация")).toBeInTheDocument();
  });
  it("Password mismatch", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/почта/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText("Пароль"), "123");
    userEvent.type(getByPlaceholderText(/повторно/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("Пароли не совпадают")).toBeInTheDocument();
  });
  it("acc already created", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/почта/i), "alexey@gmail.com");
    userEvent.type(getByPlaceholderText("Пароль"), "12");
    userEvent.type(getByPlaceholderText(/повторно/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("Аккаунт уже создан")).toBeInTheDocument();
  });
  it("user registration", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/почта/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText("Пароль"), "12");
    userEvent.type(getByPlaceholderText(/повторно/i), "12");
    userEvent.click(getByRole("button"));
    expect(
      await findByText(/Необходимо подтверждение аккаунта/i)
    ).toBeInTheDocument();
  });
  it("not enough data", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText("Пароль"), "12");
    userEvent.type(getByPlaceholderText(/повторно/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("Не все данные были введены")).toBeInTheDocument();
  });
});
