import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testName: "",
  solutions: [],
};

const checkPresence = (arr, key) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].questionId === key) {
      return [i, true];
    }
  }
  return [-1, false];
};

const userAnsSlice = createSlice({
  name: "userAns",
  initialState,
  reducers: {
    setTestName: (state, action) => {
      state.testName = action.payload.testName;
    },
    setSolutions: (state, action) => {
      const data = {
        questionId: action.payload.questionId,
        optionId: action.payload.optionId,
        visitedFlag: action.payload.visitedFlag,
      };

      const res = checkPresence(state.solutions, data.questionId);
      if (res[1]) {
        state.solutions[res[0]].optionId = data.optionId;
      } else {
        state.solutions.push(data);
      }
    },
    setVisitedFlag: (state, action) => {
      const res = checkPresence(state.solutions, action.payload.questionId);
      if (res[1]) {
        state.solutions[res[0]].visitedFlag = action.payload.visitedFlag;
      }
    },
    resetUserAnsState: (state) => {
      state.testName = "";
      state.solutions = [];
    },
  },
});

export const { setTestName, setSolutions, setVisitedFlag, resetUserAnsState } =
  userAnsSlice.actions;

export default userAnsSlice.reducer;
