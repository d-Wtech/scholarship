import { combineReducers } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice.js";

const rootReducer = combineReducers({
  login: loginSlice,
});

export default rootReducer;
