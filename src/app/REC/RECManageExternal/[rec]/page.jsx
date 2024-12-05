"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import SearchBar from "../../../components/searchbar/SearchBar";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import AddAccModal from "../../../components/modals/AddExternalReviewerModal";
import EditAccModal from "../../../components/modals/EditExternalAccReviewerModal";
import ArchiveConfirmationModal from "../../../components/modals/ArchiveConfirmationModal";
import "../../../styles/ireb/IrebManageAccounts.css";
import withAuthorization from "../../../../hoc/withAuthorization";
import { Spinner } from "react-bootstrap";

function IrebManageExternal({ params }) {
  const [modalShowAddAcc, setModalShowAddAcc] = useState(false);
  const [modalShowEditAcc, setModalShowEditAcc] = useState(false);
  const [modalShowArchiveConfirmation, setModalShowArchiveConfirmation] =
    useState(false);
  const [selectedInvestigator, setSelectedInvestigator] = useState(null);
  const [external, setExternal] = useState([]);
  const [filteredExternal, setFilteredExternal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [isArchivedShown, setIsArchivedShown] = useState(false);
  const handleShowArchived = () => setIsArchivedShown(!isArchivedShown);

  const handleShowAddAccModal = () => setModalShowAddAcc(true);
  const handleShowEditAccModal = (investigator) => {
    setSelectedInvestigator(investigator);
    setModalShowEditAcc(true);
  };
  const handleShowArchiveModal = (investigator) => {
    setSelectedInvestigator(investigator);
    setModalShowArchiveConfirmation(true);
  };

  const handleArchive = async () => {
    if (selectedInvestigator) {
      try {
        const response = await axios.patch(
          `/api/addExternalReviewer/${selectedInvestigator._id}`,
          {
            isArchived: true,
          }
        );
        if (response.status === 200) {
          const updatedExternal = external.map((reviewer) =>
            reviewer._id === selectedInvestigator._id
              ? { ...reviewer, isArchived: true }
              : reviewer
          );
          setExternal(updatedExternal);
          setFilteredExternal(
            updatedExternal.filter((reviewer) => !reviewer.isArchived)
          );
        }
      } catch (error) {
        console.error("Error archiving external reviewer:", error);
      } finally {
        handleCloseArchiveModal();
      }
    }
  };

  const handleCloseAddAccModal = () => setModalShowAddAcc(false);
  const handleCloseEditAccModal = () => setModalShowEditAcc(false);
  const handleCloseArchiveModal = () => setModalShowArchiveConfirmation(false);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = external.filter(
      (reviewer) =>
        !reviewer.isArchived &&
        (reviewer.name.toLowerCase().includes(lowercasedQuery) ||
          reviewer.email.toLowerCase().includes(lowercasedQuery) ||
          reviewer.affiliation.toLowerCase().includes(lowercasedQuery))
    );
    setFilteredExternal(filtered);
  };

  useEffect(() => {
    const fetchExternalReviewers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/api/addExternalReviewer?rec=${params.rec}`
        );
        const allReviewers = response.data.data;

        const filteredReviewers = isArchivedShown
          ? allReviewers
          : allReviewers.filter((reviewer) => !reviewer.isArchived);

        setExternal(filteredReviewers);
        setFilteredExternal(filteredReviewers);
      } catch (error) {
        console.error("Error fetching external reviewers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExternalReviewers();
  }, [params.rec, isArchivedShown]);

  //loading

  const loadingContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "var(--secondary-color)",
  };
  const spinnerStyle = {
    width: "4rem",
    height: "4rem",
    color: "var(--tertiary-color)",
  };
  const loadingTextStyle = {
    fontFamily: "var(--poppins)",
    fontSize: "var(--paragraph-size)",
    color: "var(--primary-color)",
    marginTop: "1rem",
  };

  if (isLoading) {
    return (
      <div style={loadingContainerStyle}>
        <Spinner animation="border" role="status" style={spinnerStyle}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p style={loadingTextStyle}>
          Please wait, we are verifying your access...
        </p>
      </div>
    );
  }

  return (
    <div className="adminpage-container">
      <div className="irebnav-mobile">
        <RecNavMobile />
      </div>
      <RecNav />
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
            <div className="me-title">
              <h1>Manage Accounts</h1>
            </div>

            <div className="acctype-container">
              <div className="acctype">
                <h2>External Reviewers</h2>
              </div>

              <div className="acctype-toggles">
                <div className="search-bar">
                  <SearchBar onSearch={handleSearch} />
                </div>

                <button
                  className="me-buttonaddacc"
                  onClick={handleShowAddAccModal}
                >
                  {" "}
                  + &nbsp; &nbsp; Add an Account{" "}
                </button>
              </div>
            </div>

            <div className="manageaccounts-table">
              <table className="me-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Affiliation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredExternal && filteredExternal.length > 0 ? (
                    filteredExternal.map((reviewer, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{reviewer.name}</td>
                        <td>{reviewer.email}</td>
                        <td>{reviewer.affiliation}</td>
                        <td>
                          <button
                            className="edit-icon"
                            onClick={() => handleShowEditAccModal(reviewer)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                          </button>
                          {reviewer.isArchived ? null : (
                            <button
                              className="archive-icon"
                              onClick={() => handleShowArchiveModal(reviewer)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-archive"
                                viewBox="0 0 16 16"
                              >
                                <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                              </svg>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button className="archive-toggle" onClick={handleShowArchived}>
                {isArchivedShown ? "Hide Archived" : "Show Archived"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AddAccModal
        show={modalShowAddAcc}
        onHide={handleCloseAddAccModal}
        rec={params.rec}
      />
      <EditAccModal
        show={modalShowEditAcc}
        onHide={handleCloseEditAccModal}
        data={selectedInvestigator}
      />
      <ArchiveConfirmationModal
        show={modalShowArchiveConfirmation}
        onHide={handleCloseArchiveModal}
        onConfirm={handleArchive}
      />
    </div>
  );
}

export default withAuthorization(IrebManageExternal, "REC");
