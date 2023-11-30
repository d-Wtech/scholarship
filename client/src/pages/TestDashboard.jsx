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
    <div className="">
      <div className="">
        <div className="flex items-center justify-center w-1/5 m-auto">
          <img src={logo} alt="" />
        </div>
        {/* user name */}
        <div className=" mt-5">
          <select
            name="userDashboard"
            className="text-center bg-gray-100 w-1/4"
            id=""
          >
            {" "}
            <option value="anish" selected>
              Anish
            </option>
            <option value="anishwanare9@gmail.com" disabled>
              Email : anishwanare9@gmail.com
            </option>
            <option value="logout">Logout</option>
          </select>
        </div>
        <hr className="h-1 bg-black" />
      </div>
      <div className="text-xs mt-10 p-2 flex flex-col gap-2">
        <p className="text-green-600 font-semibold">
          Dnyanankur Publication {" > "} Test Center {" > "} Mock Test {" > "} Test
          Details
        </p>
        <p className="font-bold text-base">Test Preview</p>
        <div className="bg-white p-8 rounded shadow-md max-w-md text-base">
          <ul>
            <li className="mb-2">
              <span className="font-bold">Test Name:</span> {TestName}
            </li>
            <li className="mb-2">
              <span className="font-bold">Subject:</span> English
            </li>
            <li className="mb-2">
              <span className="font-bold">Total Questions:</span> 15
            </li>
            <li className="mb-2">
              <span className="font-bold">Total Marks:</span> 15
            </li>
            <li className="mb-2">
              <span className="font-bold">Negative Marking:</span> No negative
              marking
            </li>
            <li className="mb-2">
              <span className="font-bold">Time available:</span> 30 min
            </li>
          </ul>
          <div className="flex gap-3 justify-end my-5">
            <button
              type="button"
              className="bg-blue-400 p-1 text-lg border-b-black border shadow-md"
              onClick={handleOnStart}
            >
              Start Exam
            </button>
            <button
              type="button"
              className="p-1 text-lg bg-gray-200 border-b-black border shadow-md"
            >
              <Link to={"/test-dashboard"}>Back</Link>
            </button>
          </div>
          <div className="text-gray-500 text-sm">
            <p>Thanks for Appearing Test</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
