import { render, fireEvent } from "@testing-library/react";
import Add from "./add";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "app/store";

describe("Add question", () => {
  it("should view error message when empty option", () => {
    let component = render(
      <Provider store={store}>
        <Router>
          <Add />
        </Router>
      </Provider>
    );
    let input = component.getByTestId("input-optionone");
    fireEvent.change(input, { target: { value: "option A" } });
    let submitButton = component.getByTestId("submit-btn");
    fireEvent.click(submitButton);
    expect(component.getByTestId("error-msg")).toBeInTheDocument();
  });
});
