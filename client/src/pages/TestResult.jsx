import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import ProfileDropdown from "../Components/ProfileDropdown";
import { resetUserData } from "../store/features/loginSlice";
import { useState } from "react";

const TestResult = ({ TestName }) => {
  const loginStatus = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(resetUserData());
  };

  const handleDeleteAccount = () => {};

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <img src={logo} alt="Logo" className="w-full md:w-1/5 mb-5 md:mb-0" />
          <div className="mt-5 md:ml-5 md:mt-0">
            <button
              className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 m-1"
              type="button"
              onClick={handleToggleDropdown}
            >
              Profile
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
        </div>
      </div>
      <div className="text-xs mt-10 p-2 flex flex-col gap-2 text-gray-800 dark:text-gray-200">
        <p className="text-gray-600 dark:text-gray-300 font-semibold">
          Dnyanankur Publication {" > "} Test Center {" > "} Mock Test {" > "}
          Test Details
        </p>
        <p className="font-bold text-base">Test Details</p>
        <hr className="h-1 w-full bg-slate-50" />
        <div className="mx-auto max-w-md overflow-x-auto">
          <table className="table-auto w-full border dark:border-gray-600">
            <thead>
              <tr>
                <th className="bg-gray-200 border px-4 py-2 text-left dark:bg-gray-300 text-black">
                  English
                </th>
                <th className="bg-gray-200 border px-4 py-2 text-left dark:bg-gray-300 text-black">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Total Name</td>
                <td className="border px-4 py-2">{TestName}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Total Questions</td>
                <td className="border px-4 py-2">15</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Total Marks</td>
                <td className="border px-4 py-2">15</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Time Duration</td>
                <td className="border px-4 py-2">30 min</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-end my-5">
          <button
            type="button"
            className="p-1 text-base bg-gray-200 border-b-black border shadow-md text-black w-fit"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestResult;
