"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddAccModal from "../../components/modals/AddFAQModal";
import EditAccModal from "../../components/modals/EditContentModal";
import ArchiveConfirmationModal from "../../components/modals/ArchiveConfirmationModal";
import "../../styles/rec/RECManageContent.css";
import { Spinner } from "react-bootstrap";

import withAuthorization from "../../../hoc/withAuthorization";
import { set } from "mongoose";

function IREBManageContent(props) {
  const [modalShowAddAcc, setModalShowAddAcc] = useState(false);
  const [modalShowEditAcc, setModalShowEditAcc] = useState(false);
  const [modalShowArchiveConfirmation, setModalShowArchiveConfirmation] =
    useState(false);

  const handleShowAddAccModal = () => setModalShowAddAcc(true);
  const handleShowEditAccModal = () => setModalShowEditAcc(true);
  const handleShowArchiveModal = () => setModalShowArchiveConfirmation(true);
  const handleCloseAddAccModal = () => setModalShowAddAcc(false);
  const handleCloseEditAccModal = () => setModalShowEditAcc(false);
  const handleCloseArchiveModal = () => setModalShowArchiveConfirmation(false);

  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = content.filter(
      (faq) =>
        faq.heading.toLowerCase().includes(lowercasedQuery) ||
        faq.body.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredContent(filtered);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/IREBContent");
        console.log("API Response:", response.data);
        setContent(response.data.data);
        setFilteredContent(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [props.modalShowAddAcc]);

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
      <div className="recnav-mobile">
        <IrebNavMobile />
      </div>
      <IrebNav />
      <div className="rec-managecontent">
        <div className="adminmain-content">
          <div className="rec-header-container">
            <div className="adminheader-container">
              <UserLoggedIn className="user-loggedin" />
            </div>
          </div>

          <div className="rec-header-container-mobile">
            <div className="userloggedin-mobile">
              <UserLoggedIn />
            </div>
          </div>

          <div className="manage-content">
            <div className="mc-title">
              <h1>Manage IREB Content</h1>
            </div>

            <div className="contenttype-container">
              <div className="contenttype">
                <h2>Frequently Asked Questions</h2>
              </div>

              <div className="contenttype-toggles">
                <div className="search-bar">
                  <SearchBar className="search-bar" onSearch={handleSearch} />
                </div>

                <button
                  className="mc-buttonedit"
                  onClick={handleShowAddAccModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                  </svg>
                  Add FAQ
                </button>
              </div>
            </div>

            <div className="managecontent-table">
              <table className="mc-table">
                <thead>
                  <tr>
                    <th>Heading</th>
                    <th>Body</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContent && filteredContent.length > 0 ? (
                    filteredContent.map((form, index) => (
                      <tr key={index}>
                        <td>{form.heading}</td>
                        <td>{form.body}</td>
                        <td>
                          <button
                            class="edit-icon"
                            onClick={handleShowEditAccModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                          </button>
                          <button
                            class="archive-icon"
                            onClick={handleShowArchiveModal}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-archive"
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
                      <td colSpan="5">No data available</td>{" "}
                      {/* Fallback when no data */}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AddAccModal show={modalShowAddAcc} onHide={handleCloseAddAccModal} />
      <EditAccModal show={modalShowEditAcc} onHide={handleCloseEditAccModal} />
      <ArchiveConfirmationModal
        show={modalShowArchiveConfirmation}
        onHide={handleCloseArchiveModal}
      />
    </div>
  );
}

export default withAuthorization(IREBManageContent, "IREB");