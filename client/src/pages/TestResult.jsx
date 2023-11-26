import logo from "../assets/logo.png";

const TestResult = ({ TestName }) => {
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
          Dnyanankur Publication {" > "} Test Center {" > "} Mock Test {" > "}
          Test Details
        </p>
        <p className="font-bold text-base">
          Test Details <hr />
        </p>
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
        <div className="flex gap-3 justify-end my-5">
          <button
            type="button"
            className="p-1 text-base bg-gray-200 border-b-black border shadow-md"
          >
            Back
          </button>
          {/* <button
            type="button"
            className="bg-blue-400 p-1 text-base border-b-black border shadow-md"
          >
            Start Test
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default TestResult;
