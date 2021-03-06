import { gql } from "graphql-tag";
import { templateFragment } from "./components/graphQl-fragments/templateFragment";
import { GraphQLError } from "graphql";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { MockedProvider } from "@apollo/client/testing";
import "./accets/FAIcons";
import React from "react";
import { data as mainData, mainReducer } from "./store/mainReducer";
import { authReducer, data as authData } from "./store/authReducer";
import { menuReducer, data as menuData } from "./store/menuReducer";
import userEvent from "@testing-library/user-event/dist";
import { AppContainer } from "./AppContainer";

const appGQL = gql`
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
const authGQL = gql`
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
const mocks = [
  {
    request: {
      query: appGQL,
      variables: { token: "" },
    },
    result: { errors: [new GraphQLError("data")] },
  },
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
                  name: "????????1",
                  placeholder: "",
                  type: "text",
                  width: 20,
                  height: 3,
                  fieldDescription: "",
                  descriptionPosition: "inline",
                },
                {
                  name: "????????2",
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
        name: "????????1",
        placeholder: "",
        type: "text",
        width: 20,
        height: 3,
        fieldDescription: "",
        descriptionPosition: "inline" as "inline" | "bottom",
      },
      {
        id: "2",
        name: "????????2",
        placeholder: "",
        type: "text",
        width: 20,
        height: 3,
        fieldDescription: "",
        descriptionPosition: "inline" as "inline" | "bottom",
      },
    ],
  },
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
        name: "????????1",
        placeholder: "",
        type: "text",
        width: 20,
        height: 3,
        fieldDescription: "",
        descriptionPosition: "inline" as "inline" | "bottom",
      },
      {
        id: "2",
        name: "????????2",
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
const renderWithRedux = (
  authState: typeof authData = authData,
  mainState: typeof mainData = mainData,
  menuState: typeof menuData = menuData
) => {
  return {
    ...render(
      <BrowserRouter>
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
          <MockedProvider mocks={mocks}>
            <AppContainer />
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
  it("render", async () => {
    const { getByText } = renderWithRedux(
      { ...authData },
      { ...mainData },
      { ...menuData }
    );
    await waitFor(() => {
      expect(getByText("????????????")).toBeInTheDocument();
    });
    expect(getByText("???????????????????????????????? ??????????????")).toBeDisabled();
  });
  it("check user's templates", async () => {
    const { getByText, getAllByTitle } = renderWithRedux(
      { ...authData, isAuth: true, userTemplates },
      { ...mainData },
      { ...menuData }
    );
    await waitFor(() => {
      expect(getByText("???????????????????????????????? ??????????????")).toBeEnabled();
    });
    userEvent.click(getByText("???????????????????????????????? ??????????????"));
    expect(getAllByTitle("deconsteTemplate")).toHaveLength(2);
  });
  it("check auth and redirect after auth", async () => {
    const { getByText, getByPlaceholderText, getByRole, findByText } =
      renderWithRedux({ ...authData }, { ...mainData }, { ...menuData });
    await waitFor(() => {
      userEvent.click(getByText("??????????"));
    });
    userEvent.type(getByPlaceholderText(/??????????/i), "alex@gmail.com");
    userEvent.type(getByPlaceholderText(/????????????/i), "12");
    userEvent.click(getByRole("button"));
    expect(await findByText(/???? ??????????/i)).toBeInTheDocument();
    expect(getByText("???????????????????????????????? ??????????????")).toBeEnabled();
  });
});
