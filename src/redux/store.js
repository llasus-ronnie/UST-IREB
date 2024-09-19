import { configureStore } from "@reduxjs/toolkit";
import submissionFormSlice from "../redux/slices/submissionFormSlice";
//Store => multiple slices
//1) Create a store

export const store = configureStore({
  //slices goes here
  reducer: {
    submissionForm: submissionFormSlice
  },
});

