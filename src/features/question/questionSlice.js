import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "data/_DATA";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    questions: [],
  },
  reducers: {
    questionAdded(state, action) {
      state.questions.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      state.questions = [...state.questions, action.payload];
    });
  },
});

export const selectAllQuestions = (state) => state.question.questions;

export const selectQuestionById = (state, id) => {
  return state.question.questions.find((el) => el.id === id);
};

export const selectQuestionByAnswers = (state) => {
  if (!state.user.authedUser) return { authedUser: null, new: [], done: [] };
  return {
    authedUser: state.user.authedUser,
    new: state.question.questions
      .filter((q) => {
        const hasOptOne = q.optionOne.votes.find(
          (el) => el === state.user.authedUser.id
        );
        const hasOptTwo = q.optionTwo.votes.find(
          (el) => el === state.user.authedUser.id
        );
        if (!hasOptOne && !hasOptTwo) return true;

        return false;
      })
      .sort((a, b) => b.timestamp - a.timestamp),
    done: state.question.questions
      .filter((q) => {
        const hasOptOne = q.optionOne.votes.find(
          (el) => el === state.user.authedUser.id
        );
        const hasOptTwo = q.optionTwo.votes.find(
          (el) => el === state.user.authedUser.id
        );
        if (hasOptOne || hasOptTwo) return true;

        return false;
      })
      .sort((a, b) => b.timestamp - a.timestamp),
  };
};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await _getQuestions();
    return Object.values(response);
  }
);

export const saveQuestion = createAsyncThunk(
  "questions/saveQuestion",
  async (payload, thunkAPI) => {
    const response = await _saveQuestion(payload);
    return response;
  }
);

export const saveQuestionAnswer = createAsyncThunk(
  "questions/saveQuestionAnswer",
  async (payload, thunkAPI) => {
    await _saveQuestionAnswer(payload);
    return payload;
  }
);

export const { questionAdded } = questionSlice.actions;
export default questionSlice.reducer;
