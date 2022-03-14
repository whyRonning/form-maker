import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../../../store/authReducer";
import { MockedProvider } from "@apollo/client/testing";
import "../../../../accets/FAIcons";
import React from "react";
import { data, mainReducer } from "../../../../store/mainReducer";
import { gql } from "graphql-tag";
import { templateFragment } from "../../../graphQl-fragments/templateFragment";
import userEvent from "@testing-library/user-event/dist";
import { DataFillingContainer } from "./DataFillingContainer";
const query = gql`
  ${templateFragment}
  mutation saveTemplate(
    $template: saveTemplateTemplatesType!
    $token: String!
  ) {
    saveTemplate(template: $template, token: $token) {
      ...template
    }
  }
`;
const mocks = [
  {
    request: {
      query,
      values: {
        token: "",
        template: {
          formWidth: 20,
          formBackgroundColor: "#a82727",
          generalBackgroundColor: "#1528d1",
          buttColor: "#fb05ff",
          buttTextColor: "#4a4a4a",
          titleColor: "#ffffff",
          descriptionColor: "#a175ff",
          textColor: "#fb05ff",
          title: "Форма",
          formMarginTop: 20,
          buttWidth: 18,
          buttHeight: 6,
          numOfFields: 2,
          labelsPosition: "top",
          inputs: [
            {
              id: 1,
              name: "Поле1",
              placeholder: "",
              type: "text",
              width: 20,
              height: 3,
              fieldDescription: "",
              descriptionPosition: "inline",
            },
            {
              id: 2,
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
      },
      result: {
        data: {
          saveTemplate: {},
        },
      },
    },
  },
];
const renderWithRedux = (mainState: typeof data = data, authState = {}) => {
  return {
    ...render(
      <BrowserRouter>
        <Provider
          store={createStore(combineReducers({ authReducer, mainReducer }), {
            authReducer: authState,
            mainReducer: mainState,
          })}
        >
          <MockedProvider mocks={mocks}>
            <DataFillingContainer />
          </MockedProvider>
        </Provider>
      </BrowserRouter>
    ),
  };
};
describe("dataFilling", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
  });
  it("render", () => {
    const { getAllByRole } = renderWithRedux();
    expect(getAllByRole("button")).toHaveLength(3);
  });
  it("change labels position", () => {
    const {
      getByDisplayValue,
      queryByDisplayValue,
      getByPlaceholderText,
      queryByPlaceholderText,
    } = renderWithRedux();
    expect(getByDisplayValue("top")).toBeChecked();
    expect(queryByDisplayValue("left")).not.toBeChecked();
    expect(getByPlaceholderText("Полей в строке")).toBeInTheDocument();
    userEvent.click(getByDisplayValue("left"));
    expect(getByDisplayValue("left")).toBeChecked();
    expect(queryByDisplayValue("top")).not.toBeChecked();
  });
  it("add field", () => {
    const { getByText, getAllByTitle } = renderWithRedux();
    userEvent.click(getByText("Добавить поле"));
    expect(getAllByTitle("Настройки поля")).toHaveLength(3);
  });
  it("deconste field", async () => {
    const { getAllByTitle } = renderWithRedux();
    userEvent.click(getAllByTitle("Удалить поле")[0]);
    await waitFor(() => {
      expect(getAllByTitle("Настройки поля")).toHaveLength(1);
    });
  });
});
