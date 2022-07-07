import { render } from "@testing-library/react";
import QuestionCard from "components/questionCard";
import { BrowserRouter as Router } from "react-router-dom";

describe("QuestionCard", () => {
  const question = {
    id: "1234567890",
    author: "test",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["test"],
      text: "option 1",
    },
    optionTwo: {
      votes: [],
      text: "option 2",
    },
  };

  it("will match snapshot when data is passed", () => {
    let component = render(
      <Router>
        <QuestionCard data={question} />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });

  it("will match snapshot when no data is passed", () => {
    let component = render(
      <Router>
        <QuestionCard />
      </Router>
    );
    expect(component).toMatchSnapshot();
  });
});
