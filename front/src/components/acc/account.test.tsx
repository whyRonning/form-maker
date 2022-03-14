import { render } from "@testing-library/react";
import React from "react";
import { AccountContainer } from "./accountContainer";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../store/authReducer";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const renderWithRedux = (state: { [key: string]: any } = {}) => {
  return {
    ...render(
      <BrowserRouter>
        <Provider
          store={createStore(combineReducers({ authReducer }), {
            authReducer: state,
          })}
        >
          <AccountContainer />
        </Provider>
      </BrowserRouter>
    ),
  };
};

describe("account", () => {
  it("render", () => {
    const { getByRole } = renderWithRedux({});
    expect(getByRole("button")).toContainHTML("Войти");
  });
  it("render registration form", () => {
    const { getByText, getByPlaceholderText } = renderWithRedux({});
    userEvent.click(getByText("Регистрация"));
    expect(
      getByPlaceholderText(/Введите пароль повторно/i)
    ).toBeInTheDocument();
  });
});
