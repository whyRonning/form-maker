import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../store/authReducer";
import React from "react";
import "../../accets/FAIcons";
import { AuthContainer } from "./authContainer";
import userEvent from "@testing-library/user-event";
import { gql } from "graphql-tag";
import { templateFragment } from "../graphQl-fragments/templateFragment";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
let authGQL = gql`
  ${templateFragment}
  query auth($email: String!, $password: String!) {
    auth(email: $email, password: $password) {
      token
      templates {
        ...template
      }
    }
  }
`;

let mocks = [
  {
    request: {
      query: authGQL,
      variables: { email: "alex@gmail.com", password: "12" },
    },
    result: {
      data: {
        auth: {
          token: "123",
          templates: [
            {
              generalBackgroundColor: "#ffffff",
              formBackgroundColor: "#a3a19f",
              titleColor: "#ffffff",
              descriptionColor: "#a175ff",
              formWidth: 80,
              formMarginTop: 23,
              buttHeight: 6,
              buttWidth: 35,
              textColor: "#000000",
              buttColor: "#65ccbc",
              buttTextColor: "#fdfcff",
              title: "",
              labelsPosition: "top",
              numOfFields: 2,
              inputs: [
                {
                  name: "Поле1",
                  placeholder: "",
                  type: "text",
                  width: 20,
                  height: 3,
                  fieldDescription: "",
                  descriptionPosition: "inline",
                },
                {
                  name: "Поле2",
                  placeholder: "",
                  type: "text",
                  width: 20,
                  height: 3,
                  fieldDescription: "",
                  descriptionPosition: "inline",
                },
              ],
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: authGQL,
      variables: { email: "alex@gmail.com", password: "123" },
    },
    result: { errors: [new GraphQLError("data")] },
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
            <AuthContainer />
          </MockedProvider>
        </Provider>
      </BrowserRouter>
    ),
  };
};
describe("auth", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  it("render", () => {
    let { getByText } = renderWithRedux();
    expect(getByText("Войти"));
  });
  it("bad user authorization", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/почта/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText(/пароль/i), "123");
    userEvent.click(getByRole("button"));
    expect(
      await findByText("Неверно введен логин или пароль")
    ).toBeInTheDocument();
  });
  it("user authorization", async () => {
    let { getByRole, findByText, getByPlaceholderText } = renderWithRedux();
    userEvent.type(getByPlaceholderText(/почта/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText(/пароль/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText(/вы вошли/i)).toBeInTheDocument();
  });
  it("change type of password input", () => {
    let { getByPlaceholderText, getByTitle } = renderWithRedux();
    userEvent.click(getByTitle("Показать пароль"));
    expect(getByPlaceholderText("Пароль")).toHaveProperty("type", "text");
    userEvent.click(getByTitle("Скрыть пароль"));
    expect(getByPlaceholderText("Пароль")).toHaveProperty("type", "password");
  });
});
