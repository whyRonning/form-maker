import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer, data as authData } from "../../../store/authReducer";
import { data as mainData, mainReducer } from "../../../store/mainReducer";
import { data as menuData, menuReducer } from "../../../store/menuReducer";
import { MiniHeaderSwitchContainer } from "./MiniHeaderSwitchContainer";
import "./../../../accets/FAIcons";
let renderWithRedux = (
  authState: typeof authData = authData,
  mainState: typeof mainData = mainData,
  menuState: typeof menuData = menuData
) => {
  return {
    ...render(
      <Provider
        store={createStore(
          combineReducers({ authReducer, mainReducer, menuReducer }),
          {
            mainReducer: mainState,
            authReducer: authState,
            menuReducer: menuState,
          }
        )}
      >
        <MiniHeaderSwitchContainer />
      </Provider>
    ),
  };
};
describe("miniHeader", () => {
  it("render", () => {
    let { getByText } = renderWithRedux();
    expect(getByText("Настройки"));
  });
  it("check button when user is auth", () => {
    let { getByText } = renderWithRedux({ ...authData, isAuth: true });
    expect(getByText("Пользовательские шаблоны")).toBeEnabled();
  });
});
