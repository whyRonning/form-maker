import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import React from "react";
import { mainReducer } from "../../../../store/mainReducer";
import userEvent from "@testing-library/user-event/dist";
import { TemplatesContainer } from "./templatesContainer";
import { templates } from "../../../../store/initialTemplates";
let renderWithRedux = (state: any = {}) => {
  return {
    ...render(
      <BrowserRouter>
        <Provider
          store={createStore(combineReducers({ mainReducer }), {
            mainReducer: state,
          })}
        >
          <TemplatesContainer />
        </Provider>
      </BrowserRouter>
    ),
  };
};
describe("templates", () => {
  it("render", () => {
    let { getAllByRole } = renderWithRedux({ templates, filters: [] });
    expect(getAllByRole("img")).toHaveLength(4);
  });
  it("open filters", () => {
    let { getByText, getAllByRole } = renderWithRedux({
      templates,
      filters: [],
    });
    userEvent.click(getByText("Фильтр"));
    expect(getAllByRole("checkbox")).toHaveLength(4);
  });
  it("use filters", () => {
    let { getByText, getAllByRole } = renderWithRedux({
      templates,
      filters: [],
    });
    userEvent.click(getByText("Фильтр"));
    userEvent.click(getByText("Форма обратной связи"));
    expect(getAllByRole("img")).toHaveLength(1);
    userEvent.click(getByText("Форма обратной связи"));
    expect(getAllByRole("img")).toHaveLength(4);
    userEvent.click(getByText("Форма обратной связи"));
    userEvent.click(getByText("Заказ звонка"));
    expect(getAllByRole("img")).toHaveLength(2);
  });
});
