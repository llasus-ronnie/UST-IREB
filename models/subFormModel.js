import { type } from "os";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const researcherSchema = new Schema({
  index: {
    type: Number,
    require: true,
  },

  additionalFullName: {
    type: String,
    require: false,
  },

  additionalEmail: {
    type: String,
    require: false,
  },

  additionalPhone: {
    type: Number,
    require: false,
  },

  additionalInstitutionAffiliation: {
    type: String,
    require: false,
  },
});

const subFormSchema = new Schema({
  institution: {
    type: String,
    require: true,
  },

  researchEthicsCommittee: {
    type: String,
    require: true,
  },

  agreeSoftCopies: {
    type: Boolean,
    require: true,
  },

  understandSubmission: {
    type: Boolean,
    require: true,
  },

  understandConfidentiality: {
    type: Boolean,
    require: true,
  },

  fullName: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },

  institutionAffiliation: {
    type: String,
    require: true,
  },

  additionalFullName: {
    type: String,
    require: false,
  },

  additionalEmail: {
    type: String,
    require: false,
  },

  additionalPhone: {
    type: Number,
    require: false,
  },

  additionalInstitutionAffiliation: {
    type: String,
    require: false,
  },

  additionalResearchers: {
    type: [researcherSchema],
    require: false,
  },

  title: {
    type: String,
    require: true,
  },
  background: {
    type: String,
    require: true,
  },
  objectives: {
    type: String,
    require: true,
  },
  expectedOutcomes: {
    type: String,
    require: true,
  },
  keywords: {
    type: String,
    require: true,
  },
  studyType: {
    type: String,
    require: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
  primarySponsor: {
    type: String,
    require: true,
  },
  secondarySponsor: {
    type: String,
    require: true,
  },
  multiCountryResearch: {
    type: String,
    require: true,
  },
  multiSiteResearch: {
    type: String,
    require: true,
  },
  region: {
    type: String,
    require: true,
  },
  researchField: {
    type: String,
    require: true,
  },
  involvesHumanSubjects: {
    type: String,
    require: true,
  },
  proposalType: {
    type: String,
    require: true,
  },
  dataCollection: {
    type: String,
    require: true,
  },
  proposalReviewedByOtherCommittee: {
    type: String,
    require: true,
  },
  monetarySource: {
    type: String,
    require: true,
  },
  amountInPHP: {
    type: Number,
    require: true,
  },
  otherSource: {
    type: String,
    require: true,
  },
  mainFile: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now
  }
});

const subForm =
  mongoose.models.subForm || mongoose.model("subForm", subFormSchema);
export default subForm;
