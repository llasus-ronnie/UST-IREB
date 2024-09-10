import connectDB from '../../../../utils/database';
import SubmissionForm from '../../../../models/subFormModel';
import { NextResponse } from 'next/server';

export async function POST (req){
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
    await SubmissionForm.create({
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

    return NextResponse.json ({message: 'Form submitted successfully!'}, {status:201});
}

export async function GET (req){
    await connectDB();
    const forms = await SubmissionForm.find({});
    return NextResponse.json({forms}, {status:200});
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }
    
    try {
        await connectDB();
        await SubmissionForm.findByIdAndDelete(id);

        return new Response(JSON.stringify({ message: 'Successfully deleted' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
