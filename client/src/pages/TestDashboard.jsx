import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const TestDashboard = ({ TestName }) => {
  const navigate = useNavigate();
  const handleOnStart = () => {
    const startQuiz = window.confirm("Do You want to start exam?");
    if (startQuiz) {
      // Redirect to the ${TestName}-quiz page
      navigate(`/${TestName}-quiz`);
    } else {
      // do nothing
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-2/3 sm:w-1/3 md:w-1/4 lg:w-1/5 m-auto"
          />

          <div className="mt-4">
            <select
              name="userDashboard"
              className="text-center bg-gray-800 text-white w-full p-2 rounded"
            >
              <option value="anish">Anish</option>
              <option value="anishwanare9@gmail.com" disabled>
                Email: anishwanare9@gmail.com
              </option>
              <option value="logout">Logout</option>
            </select>
          </div>
          <hr className="h-1 bg-white w-full my-4" />
        </div>

        <div className="text-sm mt-6 p-4 flex flex-col gap-4">
          <p className="text-green-400 font-semibold">
            Dnyanankur Publication {" > "} Test Center {" > "} Mock Test {" > "}{" "}
            Test Details
          </p>
          <p className="font-bold text-lg">Test Preview</p>

          <div className="bg-gray-800 p-4 rounded shadow-md">
            <ul className="list-disc pl-4">
              <li>
                <span className="font-bold">Test Name:</span> {TestName}
              </li>
              <li>
                <span className="font-bold">Subject:</span> English
              </li>
              <li>
                <span className="font-bold">Total Questions:</span> 15
              </li>
              <li>
                <span className="font-bold">Total Marks:</span> 15
              </li>
              <li>
                <span className="font-bold">Negative Marking:</span> No negative
                marking
              </li>
              <li>
                <span className="font-bold">Time available:</span> 30 min
              </li>
            </ul>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-6">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-4"
                onClick={handleOnStart}
              >
                Start Exam
              </button>
              <button
                type="button"
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
              >
                <Link to="/test-dashboard">Back</Link>
              </button>
            </div>

            <div className="text-gray-300 text-sm mt-4">
              <p>Thanks for Appearing Test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
