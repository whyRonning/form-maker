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
const registrationGQL = gql`
  query reg($email: String!, $password: String!, $passwordAccess: String!) {
    reg(email: $email, password: $password, passwordAccess: $passwordAccess)
  }
`;
const mocks = [
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
const renderWithRedux = (state: { [key: string]: any } = {}) => {
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
    const { getByText } = renderWithRedux();
    expect(getByText("??????????????????????")).toBeInTheDocument();
  });
  it("Password mismatch", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/??????????/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText("????????????"), "123");
    userEvent.type(getByPlaceholderText(/????????????????/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("???????????? ???? ??????????????????")).toBeInTheDocument();
  });
  it("acc already created", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/??????????/i), "alexey@gmail.com");
    userEvent.type(getByPlaceholderText("????????????"), "12");
    userEvent.type(getByPlaceholderText(/????????????????/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("?????????????? ?????? ????????????")).toBeInTheDocument();
  });
  it("user registration", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/??????????/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText("????????????"), "12");
    userEvent.type(getByPlaceholderText(/????????????????/i), "12");
    userEvent.click(getByRole("button"));
    expect(
      await findByText(/???????????????????? ?????????????????????????? ????????????????/i)
    ).toBeInTheDocument();
  });
  it("not enough data", async () => {
    const { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText("????????????"), "12");
    userEvent.type(getByPlaceholderText(/????????????????/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText("???? ?????? ???????????? ???????? ??????????????")).toBeInTheDocument();
  });
});
