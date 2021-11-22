import { render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { data as mainData, mainReducer } from "../../store/mainReducer";
import "./../../accets/FAIcons";
import React from "react";
import { MainContainer } from "./MainContainer";
import { authReducer, data as authData } from "../../store/authReducer";
import { menuReducer, data as menuData } from "../../store/menuReducer";
import userEvent from "@testing-library/user-event/dist";
import { MockedProvider } from "@apollo/client/testing";

let renderWithRedux = (
  authState: typeof authData = authData,
  mainState: typeof mainData = mainData,
  menuState: typeof menuData = menuData
) => {
  return {
    ...render(
      <MockedProvider>
        <Provider
          store={createStore(
            combineReducers({ mainReducer, authReducer, menuReducer }),
            {
              mainReducer: mainState,
              authReducer: authState,
              menuReducer: menuState,
            }
          )}
        >
          <MainContainer />
        </Provider>
      </MockedProvider>
    ),
  };
};
describe("main", () => {
  it("render", () => {
    let { getByText } = renderWithRedux(
      { ...authData },
      { ...mainData },
      { ...menuData }
    );
    expect(getByText("Фильтр")).toBeInTheDocument();
  });
  it("use template", () => {
    let { getByText, getAllByText } = renderWithRedux(
      { ...authData, isAuth: true },
      { ...mainData },
      { ...menuData }
    );
    userEvent.click(getByText("Фильтр"));
    userEvent.click(getByText("Форма обратной связи"));
    userEvent.click(getAllByText("Шаблон 1")[1]);
    expect(getByText("Шаблон применен")).toBeInTheDocument();
    expect(getByText("Имя")).toBeInTheDocument();
    expect(getByText("Фамилия")).toBeInTheDocument();
    expect(getByText("Телефон")).toBeInTheDocument();
    expect(getByText("Почта")).toBeInTheDocument();
    expect(getByText("Сообщение")).toBeInTheDocument();
  });
  it("delete field", async () => {
    let { getByText, getAllByTitle, queryByText } = renderWithRedux(
      { ...authData },
      { ...mainData },
      { ...menuData }
    );
    userEvent.click(getByText("Настройки"));
    userEvent.click(getAllByTitle("Удалить поле")[0]);
    await waitFor(() => {
      expect(queryByText("Поле1")).not.toBeInTheDocument();
    });
  });
  it("change settings vision", () => {
    let { getByTitle } = renderWithRedux(
      { ...authData },
      { ...mainData },
      { ...menuData }
    );
    userEvent.click(getByTitle("Закрыть настройки полей"));
    expect(getByTitle("Развернуть настройки полей")).toHaveClass(
      "icon-angles-hidden"
    );
    userEvent.click(getByTitle("Развернуть настройки полей"));
    expect(getByTitle("Закрыть настройки полей")).toHaveClass(
      "icon-angles-shown"
    );
  });
  it("change input settings", () => {
    let {
      getByText,
      getByPlaceholderText,
      getAllByTitle,
      getAllByText,
      getByLabelText,
    } = renderWithRedux({ ...authData }, { ...mainData }, { ...menuData });
    userEvent.click(getByText("Настройки"));
    userEvent.click(getAllByTitle("Настройки поля")[0]);
    userEvent.type(
      getByPlaceholderText(`Название поля`),
      `{backspace}{backspace}{backspace}{backspace}{backspace}Имя`
    );
    userEvent.click(getByText("Checkbox"));
    userEvent.click(getAllByText("Сохранить")[0]);
    expect(getAllByText("Имя")).toHaveLength(2);
    expect(getByLabelText("Имя")).toHaveProperty("type", "checkbox");
  });
});
