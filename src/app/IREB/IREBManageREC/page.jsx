"use client";

import React, { useState, useEffect } from "react";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddRECModal from "../../components/modals/AddRECModal";
import EditRECModal from "../../components/modals/EditRECModal";
import "../../styles/ireb/IrebManageREC.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import useSWR from "swr";
import withAuthorization from "../../../hoc/withAuthorization";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function IrebManageExternal() {
  const [modalShowAddREC, setModalShowAddREC] = useState(false);
  const [modalShowEditREC, setModalShowEditREC] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredREC, setFilteredREC] = useState([]);
  const { data, error } = useSWR("/api/REC", fetcher);

  useEffect(() => {
    if (data) {
      setFilteredREC(data.data);
    }
  }, [data]);

  const handleShowModalAddREC = () => setModalShowAddREC(true);
  const handleShowModalEditREC = () => setModalShowEditREC(true);
  const handleCloseModalAddREC = () => setModalShowAddREC(false);
  const handleCloseModalEditREC = () => setModalShowEditREC(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowercasedQuery = query.toLowerCase();
    const filtered = data?.data.filter(
      (rec) =>
        rec.name.toLowerCase().includes(lowercasedQuery) ||
        rec.email.toLowerCase().includes(lowercasedQuery) ||
        rec.status.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredREC(filtered);
  };

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

  if (error) return <div>Failed to load</div>;
  if (!data) {
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
                  <SearchBar onSearch={handleSearch} />
                </div>

                <button className="me-buttonfilter"> Filter & Sort </button>
                <button
                  className="me-buttonaddacc"
                  onClick={handleShowModalAddREC}
                >
                  {" "}
                  + &nbsp; &nbsp; Add REC{" "}
                </button>
              </div>
            </div>

            <div className="managerec-cards-container">
              {filteredREC && filteredREC.length > 0 ? (
                filteredREC.map((form, index) => (
                  <a
                    key={index}
                    className="managerec-card"
                    href={`../IREB/IREBManageRECRoles/${form._id}`}
                  >
                    <div className="edit-icon-container">
                      <button
                        className="edit-icon"
                        onClick={(e) => {
                          // e.stopPropagation();
                          e.preventDefault();
                          handleShowModalEditREC();
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="#fcbf15"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                        </svg>
                      </button>
                    </div>
                    <img
                      src="/images/rec logos/PHARMA-Logo.png"
                      alt="icon"
                      className="managerec-card-logo"
                    />
                    <h2>{form.name}</h2>
                    <p>{form.email}</p>
                    <p>{form.status}</p>
                  </a>
                ))
              ) : (
                <h2>No REC accounts found. Add an REC or Academic Unit.</h2>
              )}
            </div>
          </div>
        </div>
      </div>

      <AddRECModal show={modalShowAddREC} onHide={handleCloseModalAddREC} />
      <EditRECModal show={modalShowEditREC} onHide={handleCloseModalEditREC} />
    </div>
  );
}

export default withAuthorization(IrebManageExternal, "IREB");
