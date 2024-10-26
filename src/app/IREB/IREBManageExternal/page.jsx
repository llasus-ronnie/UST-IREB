"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddAccModal from "../../components/modals/AddExternalAccModal";
import EditAccModal from "../../components/modals/EditExternalAccModal";
import ArchiveConfirmationModal from "../../components/modals/ArchiveConfirmationModal";
import "../../styles/ireb/IrebManageAccounts.css";
import withAuthorization from "../../../hoc/withAuthorization";
import { Spinner } from "react-bootstrap";

function IrebManageExternal() {
  const [modalShowAddAcc, setModalShowAddAcc] = useState(false);
  const [modalShowEditAcc, setModalShowEditAcc] = useState(false);
  const [modalShowArchiveConfirmation, setModalShowArchiveConfirmation] =
    useState(false);
  const [selectedInvestigator, setSelectedInvestigator] = useState(null);
  const [external, setExternal] = useState([]);
  const [filteredExternal, setFilteredExternal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleShowAddAccModal = () => setModalShowAddAcc(true);
  const handleShowEditAccModal = (investigator) => {
    setSelectedInvestigator(investigator);
    setModalShowEditAcc(true);
  };
  const handleShowArchiveModal = () => setModalShowArchiveConfirmation(true);
  const handleCloseAddAccModal = () => setModalShowAddAcc(false);
  const handleCloseEditAccModal = () => setModalShowEditAcc(false);
  const handleCloseArchiveModal = () => setModalShowArchiveConfirmation(false);

  // Search handling
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = external.filter(
      (investigator) =>
        investigator.name.toLowerCase().includes(lowercasedQuery) ||
        investigator.email.toLowerCase().includes(lowercasedQuery) ||
        investigator.affiliation.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredExternal(filtered);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/addExternalInvestigator");
        console.log("API Response:", response.data);
        setExternal(response.data.data);
        setFilteredExternal(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

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
            <div className="me-title">
              <h1>Manage Accounts</h1>
            </div>

            <div className="acctype-container">
              <div className="acctype">
                <h2>External Accounts</h2>
              </div>

              <div className="acctype-toggles">
                <div className="search-bar">
                  <SearchBar onSearch={handleSearch} />
                </div>

                <button className="me-buttonfilter"> Filter & Sort </button>
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
                    filteredExternal.map((form, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{form.name}</td>
                        <td>{form.email}</td>
                        <td>{form.affiliation}</td>
                        <td>
                          <button
                            className="edit-icon"
                            onClick={() => handleShowEditAccModal(form)}
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
                          <button
                            className="archive-icon"
                            onClick={handleShowArchiveModal}
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
            </div>
          </div>
        </div>
      </div>

      <AddAccModal show={modalShowAddAcc} onHide={handleCloseAddAccModal} />
      <EditAccModal
        show={modalShowEditAcc}
        onHide={handleCloseEditAccModal}
        data={selectedInvestigator}
      />
      <ArchiveConfirmationModal
        show={modalShowArchiveConfirmation}
        onHide={handleCloseArchiveModal}
        data={selectedInvestigator}
      />
    </div>
  );
}

export default withAuthorization(IrebManageExternal, "IREB");
