import { useEffect, useState } from "react";

const TestPreview = ({ TestName }) => {
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

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Store the current timeLeft value in localStorage
    localStorage.setItem("testTimeLeft", timeLeft.toString());

    // Check if time has reached 00:00 and submit the test
    if (timeLeft === 0 && !submitTest) {
      setSubmitTest(true);
      // Perform the test submission logic here
      console.log("Test submitted!");
    }
  }, [timeLeft, submitTest]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-blue-400 text-white p-1 font-semibold">
        <p>Test Name: {TestName}</p>
        <p>Welcome: Anish</p>
        <p>anishwanare9@gmail.com</p>
      </div>
      <div className="mt-4 flex justify-between p-2 text-xs">
        <p>Subject: English</p>
        <p>
          Time Left:{" "}
          <span className="bg-yellow-300 px-2">{formatTime(timeLeft)} min</span>{" "}
        </p>
      </div>
      <div className="mx-auto max-w-md ">
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="bg-gray-200 border px-4 py-2 text-left">
                English
              </th>
              <th className="bg-gray-200 border px-4 py-2 text-left">
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
      <div className="text-center flex flex-col gap-2">
        <p>Do you want to Submit Test?</p>
        <div className="flex justify-center gap-14 ">
          <button type="button" className="bg-gray-200 px-3">
            Yes
          </button>
          <button type="button" className="bg-gray-200 px-3">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPreview;
