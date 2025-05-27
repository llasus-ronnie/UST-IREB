import { get } from "http";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentStep: 1,
  formData: {},

  //adiitional researcher
  additionalResearcher: [],
  fileName: "",
  paymentFile: "",
};

const submissionFormSlice = createSlice({
  name: "submissionForm",
  initialState: initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },

    updateFormData(state, action) {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },

    addResearcher(state, action) {
      const newResearcher = {
        additionalFullName: "",
        additionalEmail: "",
        additionalPhone: "",
        additionalInstitutionAffiliation: "",
      };

      state.additionalResearcher.push(newResearcher);
    },

    getFileName(state, action) {
      state.fileName = action.payload;
    },

    getPaymentFile(state, action) {
      state.paymentFile = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  updateFormData,
  addResearcher,
  getFileName,
  getPaymentFile,
} = submissionFormSlice.actions;

export default submissionFormSlice.reducer;
