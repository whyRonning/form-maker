import { Preloader } from "./preloader";
import { render, screen } from "@testing-library/react";
import React from "react";

it("render", () => {
  render(<Preloader />);
  expect(screen.getByAltText("preloader")).toBeInTheDocument();
});
