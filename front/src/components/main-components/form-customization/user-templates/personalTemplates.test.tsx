import React from "react";
import "../../../../accets/FAIcons";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { authReducer } from "../../../../store/authReducer";
import { PersonalTemplatesContainer } from "./personalTemplatesContainer";
import { MockedProvider } from "@apollo/client/testing";
import { gql } from "graphql-tag";
import { templateFragment } from "../../../graphQl-fragments/templateFragment";
import userEvent from "@testing-library/user-event/dist";
const query = gql`
  ${templateFragment}
  mutation deconsteTemplate($index: Int!, $token: String!) {
    deconsteTemplate(index: $index, token: $token) {
      ...template
    }
  }
`;
const mocks = [
  {
    request: {
      query,
      variables: { index: 0, token: "123" },
    },
    result: {
      data: {
        deconsteTemplate: { templates: [] },
      },
    },
  },
];
const userTemplates = [
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
        id: "1",
        name: "Поле1",
        placeholder: "",
        type: "text",
        width: 20,
        height: 3,
        fieldDescription: "",
        descriptionPosition: "inline" as "inline" | "bottom",
      },
      {
        id: "2",
        name: "Поле2",
        placeholder: "",
        type: "text",
        width: 20,
        height: 3,
        fieldDescription: "",
        descriptionPosition: "inline" as "inline" | "bottom",
      },
    ],
  },
];
const renderWithRedux = (state: { [key: string]: any } = {}) => {
  return {
    ...render(
      <MockedProvider mocks={mocks}>
        <Provider
          store={createStore(combineReducers({ authReducer }), {
            authReducer: state,
          })}
        >
          <PersonalTemplatesContainer />
        </Provider>
      </MockedProvider>
    ),
  };
};
describe("personalTemplates", () => {
  it("renderWithoutTemplates", () => {
    const { getByText } = renderWithRedux({ userTemplates: [] });
    expect(getByText("У вас пока нет шаблонов")).toBeInTheDocument();
  });
  it("render", () => {
    const { getByText } = renderWithRedux({ userTemplates });
    expect(getByText("Отправить")).toBeInTheDocument();
  });
  it("deconste template", async () => {
    const { getByTitle, findByText } = renderWithRedux({
      userTemplates,
      token: "123",
    });
    userEvent.click(getByTitle("deconsteTemplate"));
    expect(await findByText("Шаблон удален")).toBeInTheDocument();
  });
});
