import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "layout/main";
import Dashboard from "pages/dashboard";
import Leaderboard from "pages/leaderboard";
import Add from "pages/add";
import Poll from "pages/poll";
import Login from "pages/login";
import NotFound from "pages/notfound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/add" element={<Add />} />
        <Route path="/questions/:questionId" element={<Poll />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
