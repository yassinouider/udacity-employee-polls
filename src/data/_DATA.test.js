const { _saveQuestionAnswer, _saveQuestion } = require("./_DATA");

describe("_saveQuestion", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestion({
      author: "sarahedo",
      optionOneText: "option 1",
      optionTwoText: "option 2",
    });

    expect(response).toBeTruthy();
    expect(response.id).not.toBeNull();
    expect(response.timestamp).not.toBeNull();
    expect(response.author).toBe("sarahedo");
    expect(response.optionOne.text).toBe("option 1");
    expect(response.optionTwo.text).toBe("option 2");
  });

  it("should return error for false parameters", async () => {
    const response = await _saveQuestion({
      author: "sarahedo",
      optionOneText: undefined,
      optionTwoText: "option 2",
    }).catch((e) => e);

    expect(response).toBe(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne",
    });

    expect(response).toBeTruthy();
  });

  it("should return error for false parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: undefined,
      answer: "optionOne",
    }).catch((e) => e);

    expect(response).toBe("Please provide authedUser, qid, and answer");
  });
});
