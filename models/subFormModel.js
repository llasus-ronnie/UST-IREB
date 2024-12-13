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
  userEmail: {
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
  monetarySource1: {
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
  monetarySource2: {
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
  mainFileLink: [
    {
      url: String,
      filename: String,
    },
  ],
  supplementaryFileLink: [
    {
      url: String,
      filename: String,
    },
  ],
  status: {
    type: String,
    require: true,
    default: "Initial-Submission",
  },
  recMember: {
    type: [String],
    required: false,
  },

  classification: {
    type: String,
    require: true,
    default:
      "No classification yet. Kindly wait for further updates.",
  },
  resubmissionStatus: {
    type: String,
    require: true,
    default: "Newly-Assigned",
  },
  finalDecision: {
    type: String,
    require: true,
    default: "No Final Decision Yet",
  },
  isArchived: {
    type: Boolean,
    require: true,
    default: false,
  },
  initialSubmission: {
    type: String,
    require: true,
    default:
      "Your assigned REC is checking for the completion of your requirements. Kindly wait for their feedback.",
  },
  appeal:{
    type: Boolean,
    require: true,
    default: false,
  },
  appealStatus: {
    type: String,
    enum: ['accepted', 'declined'],
    default: "No appeal Yet",
  },
});

const subForm =
  mongoose.models.subForm || mongoose.model("subForm", subFormSchema);
export default subForm;
