import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "features/question/questionSlice";
import userReducer from "features/user/userSlice";

export const store = configureStore({
  reducer: {
    question: questionReducer,
    user: userReducer,
  },
});
