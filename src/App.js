import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestDashboard from "./pages/TestDashboard";
import LoginSignUp from "./pages/LoginSignUp";
import TestPreview from "./pages/TestPreview";
import TestResult from "./pages/TestResult";
import Quiz from "./Quiz/Quiz.js";

const App = () => {
  const TestName = "EcoSysytem-Test";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route
          path="/test-dashboard"
          element={<TestDashboard TestName={TestName} />}
        />
        <Route
          path="/test-preview"
          element={<TestPreview TestName={TestName} />}
        />
        <Route
          path={`/${TestName}-quiz`}
          element={<Quiz TestName={TestName} />}
        />
        <Route
          path="/test-result"
          element={<TestResult TestName={TestName} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
