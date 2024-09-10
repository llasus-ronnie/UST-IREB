    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const subFormSchema = new Schema({
    primaryFullName: {
    type: String,
    required: true
    },
    primaryEmail: {
    type: String,
    required: true
    },
    primaryPhoneNumber: {
    type: Number,
    required: true
    },
    primaryInstAffil: {
    type: String,
    required: true
    },
    additionalFullName: {
    type: String,
    required: true
    },
    additionalEmail: {
    type: String,
    required: true
    },
    additionalPhoneNumber: {
    type: Number,
    required: true
    },
    additionalInstAffil: {
    type: String,
    required: true
    },
    title: {
    type: String,
    required: true
    },
    background: {
    type: String,
    required: true
    },
    objectives: {
    type: String,
    required: true
    },
    outcomes: {
    type: String,
    required: true
    },
    keywords: {
    type: String,
    required: true
    },
    studyType: {
    type: String,
    required: true
    },
    startDate: {
    type: Date,
    required: true
    },
    endDate: {
    type: Date,
    required: true
    },
    primarySponsor: {
    type: String,
    required: true
    },
    secondarySponsor: {
    type: String,
    required: true
    },
    multiCountryResearch: {
    type: String,
    required: true
    },
    multiSiteResearch: {
    type: String,
    required: true
    },
    region: {
    type: String,
    required: true
    },
    researchField: {
    type: String,
    required: true
    },
    involvesHumanSubjects: {
    type: String,
    required: true
    },
    proposalType: {
    type: String,
    required: true
    },
    dataCollection: {
    type: String,
    required: true
    },
    reviewedByOtherCommittee: {
    type: String,
    required: true
    },
    monetarySource: {
    type: String,
    required: true
    },
    amountInPeso: {
    type: Number,
    required: true
    },
    otherSource: {
    type: String,
    required: true
    },
    fileType: {
    type: String,
    required: true
    },
    file: {
    type: String, // or Buffer if you're storing the file directly in the database
    required: true
    }
    });

   const subForm =mongoose.models.subForms ||mongoose.model('subForms', subFormSchema);
   export default subForm;