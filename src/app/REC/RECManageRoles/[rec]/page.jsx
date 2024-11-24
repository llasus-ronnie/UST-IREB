"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { useParams } from "next/navigation";

import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import SearchBar from "../../../components/searchbar/SearchBar";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import AddRECMemberModal from "../../../components/modals/AddRECMemberModal";
import EditRECMemberModal from "../../../components/modals/EditRECMemberModal";
import ArchiveConfirmationModal from "../../../components/modals/ArchiveConfirmationModal";
import "../../../styles/ireb/IrebManageAccounts.css";

import withAuthorization from "../../../../hoc/withAuthorization";
import { set } from "mongoose";

function IrebManageRECRoles({ params }) {
  const [modalShowAddRECMember, setModalShowAddRECMember] = useState(false);
  const [modalShowEditRECMember, setModalShowEditRECMember] = useState(false);
  const [modalShowArchiveConfirmation, setModalShowArchiveConfirmation] =
    useState(false);
  const [REC, setREC] = useState(null);
  const [RECMembers, setRECMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRECMember, setFilteredRECMember] = useState([]);
  const { rec } = useParams();

  const handleShowModalAddRECMember = () => setModalShowAddRECMember(true);
  const handleShowModalEditRECMember = (member) => {
    setSelectedMember(member);
    setModalShowEditRECMember(true);
  };

  const handleShowArchiveModal = (member) => {
    setSelectedMember(member);
    setModalShowArchiveConfirmation(true);
  };

  const handleArchive = async () => {
    if (selectedMember) {
      try {
        const response = await axios.patch(
          `/api/RECMembers/${selectedMember._id}`,
          {
            isArchived: true,
          }
        );
        if (response.status === 200) {
          const updatedMembers = RECMembers.map((member) =>
            member._id === selectedMember._id
              ? { ...member, isArchived: true }
              : member
          );
          setRECMembers(updatedMembers);
          setFilteredRECMember(
            updatedMembers.filter((member) => !member.isArchived)
          );
        }
      } catch (error) {
        console.error("Error archiving member:", error);
      } finally {
        handleCloseModalArchiveModal();
      }
    }
  };

  const handleCloseModalAddRECMember = () => setModalShowAddRECMember(false);
  const handleCloseModalEditRECMember = () => setModalShowEditRECMember(false);
  const handleCloseModalArchiveModal = () =>
    setModalShowArchiveConfirmation(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = RECMembers.filter(
      (member) =>
        (!member.isArchived &&
          member.name.toLowerCase().includes(lowercasedQuery)) ||
        member.email.toLowerCase().includes(lowercasedQuery) ||
        member.recRole.toLowerCase().includes(lowercasedQuery)
    );

    const roleOrder = {
      "REC Chair": 1,
      "REC Vice Chair": 2,
      "REC Secretary": 3,
      "Primary Reviewer": 4,
    };

    const sortedFiltered = filtered.sort((a, b) => {
      return roleOrder[a.recRole] - roleOrder[b.recRole];
    });

    setFilteredRECMember(sortedFiltered);
  };

  useEffect(() => {
    const fetchRECMembersData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/RECMembers?rec=${rec}`);
        const activeContent = response.data.data.filter(
          (member) => !member.isArchived
        );

        const roleOrder = {
          "REC Chair": 1,
          "REC Vice Chair": 2,
          "REC Secretary": 3,
          "Primary Reviewer": 4,
        };

        const sortedActiveContent = activeContent.sort((a, b) => {
          return roleOrder[a.recRole] - roleOrder[b.recRole];
        });

        setRECMembers(sortedActiveContent || []);
        setFilteredRECMember(sortedActiveContent || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRECMembersData();
  }, [params.rec]);

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
      <div className="adminnav-mobile">
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
              <h1>Manage REC Roles</h1>
            </div>

            <div className="acctype-container">
              <div className="acctype">
                <h2>Thomasian Members</h2>
              </div>

              <div className="acctype-toggles">
                <div className="search-bar">
                  <SearchBar className="search-bar" onSearch={handleSearch} />
                </div>

                <button
                  className="me-buttonaddacc"
                  onClick={handleShowModalAddRECMember}
                >
                  + &nbsp; &nbsp; Add Member
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
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRECMember.length > 0 ? (
                    filteredRECMember.map((member, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>{member.recRole}</td>
                        <td>
                          <button
                            className="edit-icon"
                            onClick={() => handleShowModalEditRECMember(member)}
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
                            onClick={() => handleShowArchiveModal(member)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-archive"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1-1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
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

      <AddRECMemberModal
        show={modalShowAddRECMember}
        onHide={handleCloseModalAddRECMember}
        REC={REC}
      />
      <EditRECMemberModal
        show={modalShowEditRECMember}
        onHide={handleCloseModalEditRECMember}
        data={selectedMember}
      />
      <ArchiveConfirmationModal
        show={modalShowArchiveConfirmation}
        onHide={handleCloseModalArchiveModal}
        onConfirm={handleArchive}
      />
    </div>
  );
}

export default withAuthorization(IrebManageRECRoles, "REC");
