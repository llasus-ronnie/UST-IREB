import { configureStore } from "@reduxjs/toolkit";
import submissionFormSlice from "../redux/slices/submissionFormSlice";

export const store = configureStore({
  reducer: {
    submissionForm: submissionFormSlice,
  },
});
