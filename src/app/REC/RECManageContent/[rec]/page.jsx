"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import RecNav from "../../../components/navbaradmin/RecNav";
import RecNavMobile from "../../../components/navbaradmin/RecNavMobile";
import UserLoggedIn from "../../../components/userloggedin/UserLoggedIn";
import EditContentModal from "../../../components/modals/EditRECContentModal";
import "../../../styles/rec/RECManageContent.css";

import withAuthorization from "../../../../hoc/withAuthorization";

function RECManageContent({ params, ...props }) {
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = async () => {
    try {
      const response = await axios.get("/api/RECContent", {
        params: { rec: rec.trim() },
      });
      setSelectedContent(response.data.data[0] || {});
      setModalShow(true);
    } catch (error) {
      console.error("Error fetching selected content:", error);
    }
  };
  const handleCloseModal = () => setModalShow(false);

  const [content, setContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  const { rec } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/RECContent", {
          params: { rec: rec.trim() },
        });
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
      <div className="adminnav-mobile">
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
                    className="bi bi-pen"
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
                    <th>Content</th>
                    <th>Files</th>
                  </tr>
                </thead>
                <tbody>
                  {content && content.length > 0 ? (
                    content.map((form, index) => (
                      <tr key={index}>
                        <td>{form.body}</td>
                        <td>
                          {form.files.map((file, index) => (
                            <div key={index}>
                              <a
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {file.filename}
                              </a>
                              <br />
                            </div>
                          ))}
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

      <EditContentModal
        show={modalShow}
        onHide={handleCloseModal}
        content={selectedContent}
      />
    </div>
  );
}

export default withAuthorization(RECManageContent, "REC");
