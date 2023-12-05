import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  sendErrorMessage,
  sendInfoMessage,
  sendSuccessMessage,
  sendWarningMessage,
} from "../utils/notifier";

const Admin_addTest = () => {
  const adminStatus = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    testName: "",
    totalQuestions: "",
    marksPerQuestion: "",
    negativeMarking: false,
    timeAvailable: "",
  });
  const [timeAvailable, setTimeAvailable] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsloading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeAvailable((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const fullTime = `${
      timeAvailable.hours < 10 ? "0" + timeAvailable.hours : timeAvailable.hours
    }:${
      timeAvailable.minutes < 10
        ? "0" + timeAvailable.minutes
        : timeAvailable.minutes
    }:${
      timeAvailable.seconds < 10
        ? "0" + timeAvailable.seconds
        : timeAvailable.seconds
    }`;
    setFormData((prev) => {
      return { ...prev, timeAvailable: fullTime };
    });
  };

  const checkDataValidity = () => {
    Object.keys(formData).forEach((key) => {
      if (!formData[key] || formData.length > 0) {
        return false;
      }
    });

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const token = adminStatus.token;

    if (checkDataValidity() && token.length > 0) {
      try {
        const res = await axios.post("/api/admin/add-test-details", formData, {
          headers: { Authorization: "Bearer " + token },
        });

        if (res.data.success) {
          sendSuccessMessage(res.data.message);
          setFormData({
            testName: "",
            totalQuestions: "",
            marksPerQuestion: "",
            negativeMarking: false,
            timeAvailable: "",
          });
          setTimeAvailable({ hours: 0, minutes: 0, seconds: 0 });
        } else {
          sendInfoMessage("Error adding test details");
          sendWarningMessage(res.data.error);
        }
      } catch (error) {
        sendErrorMessage("Error");
      }
    } else {
      sendWarningMessage("All are required fields");
    }

    setIsloading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Add Test</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="testName" className="block text-gray-600">
            Test Name:
          </label>
          <input
            type="text"
            id="testName"
            name="testName"
            autoComplete="off"
            value={formData.testName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="totalQuestions" className="block text-gray-600">
            Total Questions:
          </label>
          <input
            type="number"
            id="totalQuestions"
            name="totalQuestions"
            autoComplete="off"
            value={formData.totalQuestions}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="marksPerQuestion" className="block text-gray-600">
            Marks Per Question:
          </label>
          <input
            type="number"
            id="marksPerQuestion"
            name="marksPerQuestion"
            autoComplete="off"
            value={formData.marksPerQuestion}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              id="negativeMarking"
              name="negativeMarking"
              autoComplete="off"
              checked={formData.negativeMarking}
              onChange={handleChange}
              className="mr-2"
            />
            Allow Negative Marking
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="timeAvailable" className="block text-gray-600">
            Time Available:
          </label>
          <div className="flex">
            <input
              type="number"
              id="hours"
              name="hours"
              value={
                timeAvailable.hours < 10
                  ? "0" + timeAvailable.hours
                  : timeAvailable.hours
              }
              onChange={handleTimeChange}
              min="0"
              max="99"
              className="w-1/4 px-4 py-2 border rounded-l-md focus:outline-none focus:border-blue-500"
              required
            />
            <span className="flex items-center px-2 text-gray-600">hrs</span>
            <input
              type="number"
              id="minutes"
              name="minutes"
              value={
                timeAvailable.minutes < 10
                  ? "0" + timeAvailable.minutes
                  : timeAvailable.minutes
              }
              onChange={handleTimeChange}
              min="0"
              max="59"
              className="w-1/4 px-4 py-2 border focus:outline-none focus:border-blue-500"
              required
            />
            <span className="flex items-center px-2 text-gray-600">min</span>
            <input
              type="number"
              id="seconds"
              name="seconds"
              value={
                timeAvailable.seconds < 10
                  ? "0" + timeAvailable.seconds
                  : timeAvailable.seconds
              }
              onChange={handleTimeChange}
              min="0"
              max="59"
              className="w-1/4 px-4 py-2 border rounded-r-md focus:outline-none focus:border-blue-500"
              required
            />
            <span className="flex items-center px-2 text-gray-600">sec</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          {isLoading ? (
            <div>
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white border-r-2 border-b-2"></div>
            </div>
          ) : (
            <span>Add Test</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default Admin_addTest;
