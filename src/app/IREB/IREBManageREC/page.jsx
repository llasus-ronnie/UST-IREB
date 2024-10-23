"use client";

import React, { useState } from "react";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddRECModal from "../../components/modals/AddRECModal";
import "../../styles/ireb/IrebManageREC.css";

import withAuthorization from "../../../hoc/withAuthorization";

function IrebManageExternal() {
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className="adminpage-container">
      <div className="irebnav-mobile">
        <IrebNavMobile />
      </div>
      <IrebNav />
      <div className="ireb-manageaccounts">
        <div className="adminmain-content">
          <div className="ireb-header-container">
            <div className="adminheader-container">
              <UserLoggedIn className="user-loggedin" />
            </div>
          </div>

          <div className="ireb-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
          </div>

          <div className="manage-accounts">
            <div className="ma-title">
              <h1>Manage Accounts</h1>
            </div>

            <div className="acctype-container">
              <div className="acctype">
                <h2>REC Accounts</h2>
              </div>

              <div className="acctype-toggles">
                <div className="search-bar">
                  <SearchBar className="search-bar" />
                </div>

                <button className="me-buttonfilter"> Filter & Sort </button>
                <button className="me-buttonaddacc" onClick={handleShowModal}>
                  {" "}
                  + &nbsp; &nbsp; Add REC{" "}
                </button>
              </div>
            </div>

            <div className="managerec-cards-container">
              <div className="managerec-card">
                <img src="/images/rec logos/PHARMA-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>Faculty of Pharmacy</h2>
                <p>pharmacy@ust.edu.ph</p>
                <p>PHREB Accredited</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/NUR-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>College of Nursing</h2>
                <p>nursing@ust.edu.ph</p>
                <p>PHREB Accredited</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/SHS-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>Senior High School</h2>
                <p>shs@ust.edu.ph</p>
                <p>IREB Member</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/CICS-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>College of Information and Computing Sciences</h2>
                <p>cics@ust.edu.ph</p>
                <p>IREB Member (next time)</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/CICS-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>College of Information and Computing Sciences</h2>
                <p>cics@ust.edu.ph</p>
                <p>IREB Member</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/CICS-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>College of Information and Computing Sciences</h2>
                <p>cics@ust.edu.ph</p>
                <p>IREB Member</p>
              </div>
              <div className="managerec-card">
                <img src="/images/rec logos/CICS-Logo.png" alt="icon" className="managerec-card-logo" />
                <h2>College of Information and Computing Sciences</h2>
                <p>cics@ust.edu.ph</p>
                <p>IREB Member</p>
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <AddRECModal show={modalShow} onHide={handleCloseModal} />
    </div>
  );
}

export default withAuthorization(IrebManageExternal, "IREB");
