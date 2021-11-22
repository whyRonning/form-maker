import { render } from "@testing-library/react";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../store/authReducer";
import { HeaderContainer } from "./headerContainer";
import { AppContainer } from "../../AppContainer";
import userEvent from "@testing-library/user-event/dist";
import { mainReducer } from "../../store/mainReducer";
import { menuReducer } from "../../store/menuReducer";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import "../../accets/FAIcons";
import { gql } from "@apollo/client";
import { templateFragment } from "../graphQl-fragments/templateFragment";
let query = gql`
  ${templateFragment}
  query getUserData($userToken: String) {
    getUsersData(userToken: $userToken) {
      templates {
        ...template
      }
      token
    }
  }
`;
let mocks = [
  {
    request: {
      query: query,
      variables: { token: "" },
    },
    result: {
      errors: [new GraphQLError("data")],
    },
  },
];
let renderWithRedux = (
  state: { [key: string]: any } = {},
  Component: FC = HeaderContainer
) => {
  return {
    ...render(
      <BrowserRouter>
        <MockedProvider mocks={mocks}>
          <Provider
            store={createStore(
              combineReducers({ authReducer, mainReducer, menuReducer }),
              { authReducer: state }
            )}
          >
            <Component />
          </Provider>
        </MockedProvider>
      </BrowserRouter>
    ),
  };
};
describe("header", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  it("render", () => {
    let { getByText } = renderWithRedux();
    expect(getByText(/войти/i)).toBeInTheDocument();
  });
  it("clickToLink", async () => {
    let { findByText } = renderWithRedux({}, AppContainer);
    userEvent.click(await findByText(/помощь/i));
    expect(await findByText(/я даю соглашение/i)).toBeInTheDocument();
    userEvent.click(await findByText(/войти/i));
    expect(await findByText(/регистрация/i)).toBeInTheDocument();
  });
  it("logout test", async () => {
    let { findByText } = renderWithRedux({ isAuth: true }, AppContainer);
    userEvent.click(await findByText("Выйти"));
    expect(await findByText("Войти")).toBeInTheDocument();
  });
});
