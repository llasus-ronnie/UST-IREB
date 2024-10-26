"use client";

import React, { useState, useEffect } from "react";
import IrebNav from "../../components/navbaradmin/IrebNav";
import IrebNavMobile from "../../components/navbaradmin/IrebNavMobile";
import SearchBar from "../../components/searchbar/SearchBar";
import UserLoggedIn from "../../components/userloggedin/UserLoggedIn";
import AddRECModal from "../../components/modals/AddRECModal";
import "../../styles/ireb/IrebManageREC.css";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import useSWR from "swr";
import withAuthorization from "../../../hoc/withAuthorization";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function IrebManageExternal() {
  const [modalShow, setModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredREC, setFilteredREC] = useState([]);
  const { data, error } = useSWR("/api/REC", fetcher);

  useEffect(() => {
    if (data) {
      setFilteredREC(data.data);
    }
  }, [data]);

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

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

  if (error) return <div>Failed to load</div>;
  if (!data) {
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
                <button className="me-buttonaddacc" onClick={handleShowModal}>
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

      <AddRECModal show={modalShow} onHide={handleCloseModal} />
    </div>
  );
}

export default withAuthorization(IrebManageExternal, "IREB");
