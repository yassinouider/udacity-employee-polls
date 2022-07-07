import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { fetchQuestions } from "features/question/questionSlice";
import { fetchUsers } from "features/user/userSlice";

const container = document.getElementById("root");
const root = createRoot(container);
store.dispatch(fetchQuestions());
store.dispatch(fetchUsers());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
