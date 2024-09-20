import connectDB from "../../../../../utils/database";
import SubmissionForm from "../../../../../models/subFormModel";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    institution,
    researchEthicsCommittee,
    agreeSoftCopies,
    understandSubmission,
    understandConfidentiality,
    fullName,
    email,
    phone,
    institutionAffiliation,
    additionalFullName,
    additionalEmail,
    additionalPhone,
    additionalInstitutionAffiliation,
    additionalResearchers,
    title,
    background,
    objectives,
    expectedOutcomes,
    keywords,
    studyType,
    startDate,
    endDate,
    primarySponsor,
    secondarySponsor,
    multiCountryResearch,
    multiSiteResearch,
    region,
    researchField,
    involvesHumanSubjects,
    proposalType,
    dataCollection,
    proposalReviewedByOtherCommittee,
    monetarySource,
    amountInPHP,
    otherSource,
    fileType,
    fileInput,
  } = await req.json();

  await connectDB();
  const updatedSubmission = await SubmissionForm.findByIdAndUpdate(
    id,
    {
      institution,
      researchEthicsCommittee,
      agreeSoftCopies,
      understandSubmission,
      understandConfidentiality,
      fullName,
      email,
      phone,
      institutionAffiliation,
      additionalFullName,
      additionalEmail,
      additionalPhone,
      additionalInstitutionAffiliation,
      additionalResearchers,
      title,
      background,
      objectives,
      expectedOutcomes,
      keywords,
      studyType,
      startDate,
      endDate,
      primarySponsor,
      secondarySponsor,
      multiCountryResearch,
      multiSiteResearch,
      region,
      researchField,
      involvesHumanSubjects,
      proposalType,
      dataCollection,
      proposalReviewedByOtherCommittee,
      monetarySource,
      amountInPHP,
      otherSource,
      fileType,
      fileInput,
    },
    { new: true }
  );
  return NextResponse.json(updatedSubmission, { status: 200 });
}

export async function GET(req, { params }) {
  const { id } = params;
  await connectDB();
  const submission = await SubmissionForm.findOne({ _id: id });
  return NextResponse.json({ submission }, { status: 200 });
}
