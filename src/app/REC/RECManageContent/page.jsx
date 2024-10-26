"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import RecNav from "../../components/navbaradmin/RecNav";
import RecNavMobile from "../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddAccModal from "../../components/modals/EditContentModal";
import "../../styles/rec/RECManageContent.css";

import withAuthorization from "../../../hoc/withAuthorization";

function RECManageContent(props) {
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  const [content, setContent] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/RECContent");
        console.log("API Response:", response.data);
        setContent(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [props.modalShowAddAcc]);

  return (
    <div className="adminpage-container">
      <div className="recnav-mobile">
        <RecNavMobile />
      </div>
      <RecNav />
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
              <h1>Manage REC Content</h1>
            </div>

            <div className="contenttype-container">
              <div className="contenttype">
                <h2>Submission Requirements</h2>
              </div>

              <div className="contenttype-toggles">
                <button className="mc-buttonedit" onClick={handleShowModal}>
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
                  Edit Content
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
                  {content && content.length > 0 ? (
                    content.map((form, index) => (
                      <tr key={index}>
                        <td>{form.heading}</td>
                        <td>{form.body}</td>
                        <td>
                          <button class="edit-icon"></button>
                          <button class="archive-icon">
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

      <AddAccModal show={modalShow} onHide={handleCloseModal} />
    </div>
  );
}

export default withAuthorization(RECManageContent, "REC");
