import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { mainReducer } from "../../../store/mainReducer";
import { FormContainer } from "./FormContainer";
import React from "react";

let renderWithRedux = (state: any = {}) => {
  return {
    ...render(
      <Provider
        store={createStore(combineReducers({ mainReducer }), {
          mainReducer: state,
        })}
      >
        <FormContainer />
      </Provider>
    ),
  };
};
describe("form-display", () => {
  it("render without props", () => {
    let { queryByRole } = renderWithRedux();
    expect(queryByRole("button")).not.toBeInTheDocument();
  });
  it("render with props", () => {
    let { getByRole, getAllByPlaceholderText } = renderWithRedux({
      inputs: [
        {
          name: "Поле1",
          placeholder: "name",
          type: "text",
          width: 20,
          height: 3,
          fieldDescription: "",
          descriptionPosition: "inline",
        },
        {
          name: "Поле2",
          placeholder: "name",
          type: "text",
          width: 20,
          height: 3,
          fieldDescription: "",
          descriptionPosition: "inline",
        },
      ],
    });
    expect(getByRole("button")).toBeInTheDocument();
    expect(getAllByPlaceholderText("name")).toHaveLength(2);
  });
});
