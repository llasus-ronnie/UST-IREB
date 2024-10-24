"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

import IrebNav from "../../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../../components/searchbar/SearchBar";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import AddRECMemberModal from "../../../components/modals/AddRECMemberModal";
import "../../../styles/ireb/IrebManageAccounts.css";

import withAuthorization from "../../../../hoc/withAuthorization";

function IrebManageRECRoles({ params }) {
  const [modalShow, setModalShow] = useState(false);
  const [REC, setREC] = useState(null);
  const [RECMembers, setRECMembers] = useState([]);
  const [error, setError] = useState(null);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  useEffect(() => {
    const fetchRECData = async () => {
      try {
        const response = await axios.get(`/api/REC/${params.id}`);
        setREC(response.data.rec);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch REC details.");
      }
    };

    fetchRECData();
  }, [params.id]);

  useEffect(() => {
    const fetchRECMembersData = async () => {
      try {
        const response = await axios.get(`/api/RECMembers?rec=${REC?.name}`);
        setRECMembers(response.data.data || []);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch REC members.");
      }
    };

    if (REC?.name) {
      fetchRECMembersData();
    }
  }, [REC]);

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
              <h1>{REC?.name || "No title available"}</h1>
            </div>

            <div className="acctype-container">
              <div className="acctype">
                <h2>Manage REC Roles</h2>
              </div>

              <div className="acctype-toggles">
                <div className="search-bar">
                  <SearchBar className="search-bar" />
                </div>

                <button className="me-buttonfilter">Filter & Sort</button>
                <button className="me-buttonaddacc" onClick={handleShowModal}>
                  + &nbsp; &nbsp; Add Member
                </button>
              </div>
            </div>

            <div className="manageaccounts-table">
              <table className="me-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {RECMembers.length > 0 ? (
                    RECMembers.map((member, index) => (
                      <tr key={index}>
                        <td>{member._id}</td>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.recRole}</td>
                        <td>
                          <button className="edit-icon">
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
                          <button className="archive-icon">
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
                      <td colSpan="5" style={{ textAlign: "center" }}>
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddRECMemberModal show={modalShow} onHide={handleCloseModal} REC={REC} />
    </div>
  );
}

export default withAuthorization(IrebManageRECRoles, "IREB");
