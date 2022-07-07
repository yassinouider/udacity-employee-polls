import { store } from "../../app/store";
import { fetchQuestions, saveQuestion } from "./questionSlice";

describe("Question redux state tests", () => {
  it("Should initially set questions to an empty array", () => {
    const state = store.getState().question;
    expect(state.questions).toEqual([]);
  });

  it("Should be able to fetch the questions", async () => {
    const result = await store.dispatch(fetchQuestions());
    const questions = result.payload;

    expect(result.type).toBe("questions/fetchQuestions/fulfilled");
    expect(questions.length).toEqual(6);
  });

  it("Should be able to add a question", async () => {
    const newQuestion = {
      author: "sarahedo",
      optionOneText: "option 1",
      optionTwoText: "option 2",
    };
    const result = await store.dispatch(saveQuestion(newQuestion));
    const question = result.payload;

    expect(result.type).toBe("questions/saveQuestion/fulfilled");
    expect(question.id).not.toBeNull();

    const state = store.getState().question;
    expect(state.questions.length).toEqual(7);
  });
});
