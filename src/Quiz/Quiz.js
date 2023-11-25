import React, { useEffect, useState } from "react";

const Quiz = ({ TestName }) => {
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
    <div className="">
      <div className="flex bg-blue-400 justify-between">
        <div className=" text-white p-1 font-semibold">
          <p>Test Name: {TestName}</p>
          <p>Welcome: Anish</p>
          <p>anishwanare9@gmail.com</p>
        </div>
        <div className="">
          {" "}
          <p>
            <span className="bg-yellow-300 px-2 text-base">
              {formatTime(timeLeft)} min
            </span>{" "}
          </p>
        </div>
      </div>
      <div className="mt-3 border border-black py-2">
        <p className="bg-blue-400 w-1/5 text-center mx-5">English</p>
      </div>
      <div className="py-2 ">
        <p className="border border-black font-serif text-2xl">Question No. 1</p>
        <p></p>
      </div>
    </div>
  );
};

export default Quiz;
