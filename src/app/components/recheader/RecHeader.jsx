import React from "react";
import UserLoggedIn from "../userloggedin/UserLoggedIn";

const RecHeader = ({ college }) => {
  const getCollegeDetails = (college) => {
    switch (college) {
      case "CollegeofNursing":
        return {
          imgSrc: "/images/rec logos/NUR-Logo.png",
          headerText: "Nursing REC Dashboard",
          subText: "Overview of UST Nursing REC Submissions",
        };
      case "CICS":
      default:
        return {
          imgSrc: "/images/rec logos/CICS-Logo.png",
          headerText: "CICS REC Dashboard",
          subText: "Overview of UST CICS REC Submissions",
        };
      case "USTHospital":
        return {
          imgSrc: "/images/rec logos/USTH-Logo.png",
          headerText: "UST Hospital REC Dashboard",
          subText: "Overview of UST Hospital REC Submissions",
        };
      case "FacultyofPharmacy":
        return {
          imgSrc: "/images/rec logos/PHARMA-Logo.png",
          headerText: "Pharmacy REC Dashboard",
          subText: "Overview of UST Pharmacy REC Submissions",
        };
      case "GraduateSchool":
        return {
          imgSrc: "/images/rec logos/GS-Logo.png",
          headerText: "Graduate School REC Dashboard",
          subText: "Overview of UST Graduate School REC Submissions",
        };
      case "CollegeofRehabilitationSciences":
        return {
          imgSrc: "/images/rec logos/CRS-Logo.png",
          headerText: "Rehabilitation Sciences REC Dashboard",
          subText: "Overview of UST Rehabilitation Sciences REC Submissions",
        };
      case "FacultyofMedicineandSurgery":
        return {
          imgSrc: "/images/rec logos/MED-Logo.png",
          headerText: "Medicine and Surgery REC Dashboard",
          subText: "Overview of UST Medicine and Surgery REC Submissions",
        };
      case "SeniorHighSchool":
        return {
          imgSrc: "/images/rec logos/SHS-Logo.png",
          headerText: "Senior High School REC Dashboard",
          subText: "Overview of UST Senior High School REC Submissions",
        };
      case "CollegeofEducation":
        return {
          imgSrc: "/images/rec logos/EDUC-Logo.png",
          headerText: "Education REC Dashboard",
          subText: "Overview of UST Education REC Submissions",
        };
      case "FacultyofEngineering":
        return {
          imgSrc: "/images/rec logos/ENG-Logo.png",
          headerText: "Engineering REC Dashboard",
          subText: "Overview of UST Engineering REC Submissions",
        };
    }
  };

  const { imgSrc, headerText, subText } = getCollegeDetails(college);

  return (
    <div className="rec-header-container">
      <div className="rec-header">
        <img src={imgSrc} alt={`${college} Logo`} className="cics-logo" />
        <div className="rec-header-text">
          <h1>{headerText}</h1>
          <p>{subText}</p>
        </div>
      </div>
      <div className="userloggedin">
        <UserLoggedIn />
      </div>
    </div>
  );
};

export default RecHeader;
