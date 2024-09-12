"use client";

import React from "react";
import IrebNav from "../components/navbaradmin/IrebNav";
import SearchBar from "../components/searchbar/SearchBar";
import UserLoggedIn from "../components/userloggedin/UserLoggedIn";
import "../styles/irebmanageaccounts/IrebManageAccounts.css";

function IrebManageExternal() {
  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div className="page-container">
      <IrebNav />
      <div className="ireb-manageaccounts">
        <div className="main-content">

        <div className="header-container">
          <UserLoggedIn className="user-loggedin"/>
        </div>

        </div>
      </div>
    </div>
  );
}

export default IrebManageExternal;