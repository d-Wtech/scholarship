import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  sendErrorMessage,
  sendInfoMessage,
  sendSuccessMessage,
} from "../utils/notifier.js";
import axios from "axios";

const TestPreview = ({ TestName }) => {
  const loginStatus = useSelector((state) => state.login);
  const navigate = useNavigate();

  const { testName } = useParams();

  const initialTime = localStorage.getItem("testTimeLeft") || 30 * 60;
  const [timeLeft, setTimeLeft] = useState(parseInt(initialTime, 10));
  const [submitTest, setSubmitTest] = useState(false);

  if (submitTest) {
    alert("Test Submitted");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("testTimeLeft", timeLeft.toString());

    if (timeLeft === 0 && !submitTest) {
      setSubmitTest(true);
      console.log("Test submitted!");
    }
  }, [timeLeft, submitTest]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleTestSubmit = async () => {
    const accessToken = loginStatus.token;

    if (accessToken) {
      try {
        const res = await axios.post(
          `/api/${testName}/submit-test`,
          {},
          { headers: { Authorization: "Bearer " + accessToken } }
        );

        if (res.data.success) {
          sendSuccessMessage("Test submitted!");
          navigate(`/${testName}-result`);
        } else {
          sendInfoMessage("Cannot submit the test");
        }
      } catch (error) {
        sendErrorMessage("Error submitting");
      }
    } else {
      sendInfoMessage("You are not authenticated");
    }
  };

  const handleTestUnsubmit = () => {
    navigate(`/${testName}-quiz`);
  };

  return (
    <div className="flex flex-col gap-5 bg-gray-800 text-white p-6 min-h-screen">
      <div className="bg-blue-500 p-4 font-semibold">
        <p>Test Name: {TestName}</p>
        <p>Welcome: {loginStatus.firstName + " " + loginStatus.lastName}</p>
        <p>{loginStatus.email}</p>
      </div>
      <div className="mt-4 flex justify-between p-4 text-xs">
        <p>Subject: {testName}</p>
        <p>
          Time Left:{" "}
          <span className="bg-yellow-400 px-2">{formatTime(timeLeft)} min</span>{" "}
        </p>
      </div>
      <div className="mx-auto max-w-md ">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="bg-gray-600 border px-4 py-2 text-left">
                English
              </th>
              <th className="bg-gray-600 border px-4 py-2 text-left">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Total Questions</td>
              <td className="border px-4 py-2">15</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Answered</td>
              <td className="border px-4 py-2">15</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Marked</td>
              <td className="border px-4 py-2">15</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Not Answered</td>
              <td className="border px-4 py-2">Row 1, Col 2</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Not Visited</td>
              <td className="border px-4 py-2">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-center flex flex-col gap-4 mt-4">
        <p>Do you want to Submit Test?</p>
        <div className="flex justify-center gap-8">
          <button
            type="button"
            className="bg-green-600 text-white px-6 py-2 rounded"
            onClick={handleTestSubmit}
          >
            Yes
          </button>
          <button
            type="button"
            className="bg-red-600 text-white px-6 py-2 rounded"
            onClick={handleTestUnsubmit}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;
