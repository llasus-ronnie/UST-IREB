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
  userEmail:{
    type: String,
    require: true,
  },
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
  date: {
    type: Date,
    default: Date.now,
  },
  monetarySource: {
    type: String,
    require: true,
  },
  amountInPHP: {
    type: Number,
    require: true,
  },
  identity: {
    type: String,
    require: true,
  },
  consent: {
    type: String,
    require: true,
  },
  under18: {
    type: String,
    require: true,
  },
  dependent: {
    type: String,
    require: true,
  },
  ethnic: {
    type: String,
    require: true,
  },
  intellectual: {
    type: String,
    require: true,
  },
  pregnant: {
    type: String,
    require: true,
  },
  treatment: {
    type: String,
    require: true,
  },
  biological: {
    type: String,
    require: true,
  },
  radiation: {
    type: String,
    require: true,
  },
  distress: {
    type: String,
    require: true,
  },
  inducements: {
    type: String,
    require: true,
  },
  sensitive: {
    type: String,
    require: true,
  },
  deception: {
    type: String,
    require: true,
  },
  reproductive: {
    type: String,
    require: true,
  },
  genetic: {
    type: String,
    require: true,
  },
  stemcell: {
    type: String,
    require: true,
  },
  biosafety: {
    type: String,
    require: true,
  },
  riskLevel: {
    type: String,
    require: true,
  },
  researchTeam: {
    type: String,
    require: true,
  },
  researchSubjects: {
    type: String,
    require: true,
  },
  widerCommunity: {
    type: String,
    require: true,
  },
  multiInstitutional: {
    type: String,
    require: true,
  },
  conflictInterest: {
    type: String,
    require: true,
  },
  benefitParticipants: {
    type: String,
    require: true,
  },
  generalizableKnowledge: {
    type: String,
    require: true,
  },
  generalizableKnowledgeDisease: {
    type: String,
    require: true,
  },
  mainFileLink: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length > 0; 
      },
      message: 'mainFileLink must contain at least one string',
    },
  },
  supplementaryFileLink: {
    type: [String],
    required: false,
    validate: {
      validator: function (v) {
        return v.length > 0; 
      },
      message: 'mainFileLink must contain at least one string',
    }
  },
  status: {
    type: String,
    require: true,
    default: "Initial-Submission",
  },
  recMember: {
    type: [String],
    required: true, 
    validate: {
      validator: function (value) {
        return value.length >= 2 && value.length <= 4;
      },
      message: 'recMember must have between 2 and 4 members.',
    },
    default: ["kindly wait for your assigned reviewer", "kindly wait for your assigned reviewer", "kindly wait for your assigned reviewer", "kindly wait for your assigned reviewer"], 
  },
  
  classification:{
    type: String,
    require: true,
    default: "No Sub-remarks Yet, wait for your assigned reviewer to review your submission",
  },
  resubmissionStatus:{
    type: String,
    require: true,
    default: "Newly-Assigned"
    },
    finalDecision:{
      type: String,
      require: true,
      default: "No Final Decision Yet"
    },
});

const subForm =
  mongoose.models.subForm || mongoose.model("subForm", subFormSchema);
export default subForm;
