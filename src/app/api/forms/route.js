import connectDB from '../../../../utils/database';
import SubmissionForm from '../../../../models/subFormModel';
import { NextRequest, NextResponse } from 'next/server';


//cors 
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

// export async function POST (req){
//     const {
//             institution,
//             researchEthicsCommittee,
//             agreeSoftCopies,
//             understandSubmission,
//             understandConfidentiality,
//             fullName,
//             email,
//             phone,
//             institutionAffiliation,
//             additionalFullName,
//             additionalEmail,
//             additionalPhone,
//             additionalInstitutionAffiliation,
//             additionalResearchers,
//             title,
//             background,
//             objectives,
//             expectedOutcomes,
//             keywords,
//             studyType,
//             startDate,
//             endDate,
//             primarySponsor,
//             secondarySponsor,
//             multiCountryResearch,
//             multiSiteResearch,
//             region,
//             researchField,
//             involvesHumanSubjects,
//             proposalType,
//             dataCollection,
//             proposalReviewedByOtherCommittee,
//             monetarySource,
//             amountInPHP,
//             otherSource,
//             fileType,
//             fileInput,        
//     }= await req.json();

//     await connectDB();
//     await SubmissionForm.create({
//         institution,
//         researchEthicsCommittee,
//         agreeSoftCopies,
//         understandSubmission,
//         understandConfidentiality,
//         fullName,
//         email,
//         phone,
//         institutionAffiliation,
//         additionalFullName,
//         additionalEmail,
//         additionalPhone,
//         additionalInstitutionAffiliation,
//         additionalResearchers,
//         title,
//         background,
//         objectives,
//         expectedOutcomes,
//         keywords,
//         studyType,
//         startDate,
//         endDate,
//         primarySponsor,
//         secondarySponsor,
//         multiCountryResearch,
//         multiSiteResearch,
//         region,
//         researchField,
//         involvesHumanSubjects,
//         proposalType,
//         dataCollection,
//         proposalReviewedByOtherCommittee,
//         monetarySource,
//         amountInPHP,
//         otherSource,
//         fileType,
//         fileInput, 
//     });

//     return NextResponse.json ({message: 'Form submitted successfully!'}, {status:201});
// }

export async function POST(req, res) {
    try {
        await connectDB();
        const formdata = await req.json();
        const saveForm = await SubmissionForm.create(formdata);
        return NextResponse.json(saveForm, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(req) {
    await connectDB();
    const forms = await SubmissionForm.find({});
    return NextResponse.json({ forms }, { status: 200 });
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
