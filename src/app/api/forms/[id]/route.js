import connectDB from '../../../../../utils/database';
import SubmissionForm from '../../../../../models/subFormModel';
import { NextResponse } from 'next/server';

export async function PUT (req, {params}){
    const {id} = params;
    const {
        primaryFullName,
        primaryEmail,
        primaryPhoneNumber,
        primaryInstAffil,
        additionalFullName,
        additionalEmail,
        additionalPhoneNumber,
        additionalInstAffil,
        title,
        background,
        objectives,
        outcomes,
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
        reviewedByOtherCommittee,
        monetarySource,
        amountInPeso,
        otherSource,
        fileType,
        file
    }= await req.json();

    await connectDB();
    await SubmissionForm.findByIdAndUpdate(id, {
        primaryFullName,
        primaryEmail,
        primaryPhoneNumber,
        primaryInstAffil,
        additionalFullName,
        additionalEmail,
        additionalPhoneNumber,
        additionalInstAffil,
        title,
        background,
        objectives,
        outcomes,
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
        reviewedByOtherCommittee,
        monetarySource,
        amountInPeso,
        otherSource,
        fileType,
        file
    });
    return NextResponse.json({message: 'Form updated successfully'}, {status: 200});
}