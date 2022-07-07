import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  saveQuestion,
  saveQuestionAnswer,
} from "features/question/questionSlice";
import { _getUsers } from "data/_DATA";

const initialState = {
  authedUser: null,
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      state.authedUser = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.authedUser = action.payload;
    });
    builder.addCase(saveQuestion.fulfilled, (state, action) => {
      state.users = state.users.map((el) => {
        if (el.id === action.payload.author) {
          return { ...el, questions: el.questions.concat([action.payload.id]) };
        }
        return el;
      });
    });
    builder.addCase(saveQuestionAnswer.fulfilled, (state, action) => {
      state.users = state.users.map((el) => {
        if (el.id === action.payload.authedUser) {
          return {
            ...el,
            answers: {
              ...el.answers,
              [action.payload.qid]: action.payload.answer,
            },
          };
        }
        return el;
      });
    });
  },
});

export const selectAllUsers = (state) => {
  let usersSort = [...state.user.users];
  //return state.user.users.sort();
  usersSort.sort((a, b) => {
    if (Object.keys(a.answers).length < Object.keys(b.answers).length) return 1;
    if (Object.keys(a.answers).length === Object.keys(b.answers).length) {
      if (a.questions.length > b.questions.length) return -1;
      return 1;
    }

    return -1;
  });
  return usersSort;
};
export const selectAuthedUser = (state) => state.user.authedUser;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await _getUsers();
  return Object.values(response);
});

export const login = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue }) => {
    const response = await _getUsers();
    const user = response[payload.username];
    if (!user) return rejectWithValue("no user found");
    if (user.password !== payload.password)
      return rejectWithValue("Invalid login");
    return user;
  }
);

export const { logout } = userSlice.actions;
export default userSlice.reducer;
