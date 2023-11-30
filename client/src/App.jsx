import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TestDashboard from "./pages/TestDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TestPreview from "./pages/TestPreview";
import TestResult from "./pages/TestResult";
import Quiz from "./Quiz/Quiz";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const TestName = "EcoSysytem-Test";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
