import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "./QuizData.js";

const Quiz = ({ TestName }) => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(1);

  const moveToPreviousQuestion = () => {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const moveToNextQuestion = () => {
    if (questionNumber < 15) {
      setQuestionNumber(questionNumber + 1);
    }
  };

  const moveToGivenQuestionNumber = (n) => {
    setQuestionNumber(n);
  };

  const handleSubmitTest = () => {
    navigate("/test-preview");
  };

  const initialTime = localStorage.getItem("testTimeLeft") || 30 * 60;
  const [timeLeft, setTimeLeft] = useState(parseInt(initialTime, 10));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Store the current timeLeft value in localStorage
    localStorage.setItem("testTimeLeft", timeLeft.toString());

    // Check if time has reached 00:00 and submit the test
    if (timeLeft === 0) {
      // Perform the test submission logic here
      console.log("Test submitted!");
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {/* Main Container */}
      <div className="bg-gray-900 text-white p-4">
        {/* User Info Container */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="font-semibold text-lg md:text-xl text-gray-200 flex items-center justify-center flex-col md:items-start">
            <p className="mb-1 text-orange-500 text-2xl font-bold">
              {TestName}
            </p>
            <p className="mb-1 text-base">Welcome Anish</p>
            <p className="mb-1 text-sm">anishwanare9@gmail.com</p>
          </div>
          <div className="mt-2 md:mt-0">
            <p className="bg-orange-700 p-1 rounded-sm">
              <span className="px-2 text-base">{formatTime(timeLeft)} min</span>
            </p>
          </div>
        </div>

        {/* Test Info Container */}
        <div className="border border-slate-500 py-2 px-4 mb-4 flex items-center justify-between">
          <p className="bg-indigo-700 px-3 py-1 rounded-md text-white font-semibold">
            English
          </p>
          <p className="text-sm text-gray-200">
            <span className="font-semibold">{questionNumber}</span>
            <span className="mx-1">/</span>
            <span className="font-semibold">{questions.length}</span>
          </p>
        </div>

        {/* Test Container */}
        <div className="flex flex-col items-start">
          <div className="bg-white p-6 rounded-md shadow-md w-full">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {questions[questionNumber - 1].questionText}
              </h3>
            </div>
            <div className="mb-6">
              {questions[questionNumber - 1].questionOption.map(
                (option, index) => (
                  <label
                    key={index}
                    className="flex flex-row mb-3 text-gray-700"
                  >
                    <input
                      type="radio"
                      className="mr-2 appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {option.answerText}
                  </label>
                )
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <button
                type="button"
                onClick={moveToPreviousQuestion}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mb-2 md:mb-0 w-full md:w-auto hover:bg-gray-400 focus:outline-none focus:ring focus:border-indigo-300 disabled:cursor-not-allowed"
                disabled={questionNumber === 1}
              >
                Previous
              </button>
              <button
                type="button"
                onClick={moveToNextQuestion}
                className="bg-indigo-700 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-indigo-800 focus:outline-none focus:ring focus:border-indigo-500 disabled:cursor-not-allowed"
                disabled={questionNumber === questions.length}
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center md:justify-evenly mt-5 sm:flex-row p-5 border-slate-300 shadow-md sm:shadow-none shadow-slate-400 w-full sm:border-none border-solid border-2 rounded-lg">
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mt-5 border-white border-2 border-solid rounded-md p-5 shadow-md">
              {questions.map((value, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center bg-slate-300 h-12 w-12 rounded-md mb-2 md:mb-0 cursor-pointer hover:bg-white"
                  onClick={() => {
                    moveToGivenQuestionNumber(index + 1);
                  }}
                >
                  <span className="text-black font-semibold">{index + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex items-start justify-center flex-col">
              <div className="flex flex-row m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" fill="#00ff00" />
                </svg>
                <span className="text-white">Attempted</span>
              </div>
              <div className="flex flex-row m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" fill="#ff0000" />
                </svg>
                <span className="text-white">Not Attempted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit button Container */}
        <div className="flex items-center justify-center mt-4">
          <button
            type="button"
            className="bg-yellow-500 text-slate-900 px-6 py-3 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300 capitalize font-semibold"
            onClick={handleSubmitTest}
          >
            Submit Test
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
