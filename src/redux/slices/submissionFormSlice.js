import { get } from 'http';

const {createSlice} = require('@reduxjs/toolkit');

//initial states
const initialState={
    currentStep: 1, //form starts at step 1
    formData:{}, //form data is initially null

    //adiitional researcher
    additionalResearcher: [],
    fileName: "",
    paymentFile: ""
}


//slice creation
const submissionFormSlice = createSlice({
    name: 'submissionForm',
    initialState:initialState,
    reducers:{
        setCurrentStep(state, action){
            state.currentStep = action.payload;
        },

        updateFormData(state, action){ //takes the data and updates the form data
        state.formData = {
            ...state.formData, 
            ...action.payload
        }
    },

        addResearcher(state, action) {
            const newResearcher = {
                additionalFullName: '',
                additionalEmail: '',
                additionalPhone: '',
                additionalInstitutionAffiliation: ''
            };
            
            state.additionalResearcher.push(newResearcher);
        },

        getFileName(state, action){
            state.fileName = action.payload;
        },

        getPaymentFile(state, action){
            state.paymentFile = action.payload;
        }
    }
});

export const {
    setCurrentStep,
    updateFormData,
    addResearcher,
    getFileName,
    getPaymentFile
} = submissionFormSlice.actions;

export default submissionFormSlice.reducer;