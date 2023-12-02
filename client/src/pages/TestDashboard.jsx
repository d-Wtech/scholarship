import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import ProfileDropdown from "../Components/ProfileDropdown";
import { resetUserData } from "../store/features/loginSlice.js";
import { useDispatch } from "react-redux";

const TestDashboard = ({ TestName }) => {
  const loginStatus = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnStart = () => {
    const startQuiz = window.confirm("Do You want to start exam?");
    if (startQuiz) {
      navigate(`/${TestName}-quiz`);
    }
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(resetUserData());
  };

  const handleDeleteAccount = () => {};

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
            <button
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={handleToggleDropdown}
            >
              Profile
              <svg
                class="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen ? (
              <ProfileDropdown
                name={loginStatus.firstName + " " + loginStatus.lastName}
                email={loginStatus.email}
                phone={loginStatus.mobileNumber}
                regd={loginStatus.registeredAt}
                handleLogout={handleLogout}
                handleDelAccount={handleDeleteAccount}
              />
            ) : (
              <></>
            )}
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
