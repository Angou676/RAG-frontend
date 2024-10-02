import React, { useState } from "react";
import "./Search.css";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import SideMenu from "../../components/SideMenu/SideMenu";
import SearchForm from "../../components/SearchForm/SearchForm";

const Search: React.FC = () => {
  const [editSearch] = useState<string>("");

  return (
    <div className="search-page">
      <div className="logo" >
        <Logo />
      </div>

      {/* Side Menu */}
      <div className="menu-container">
        <SideMenu />
      </div>

      {/* Header and Search Section */}
      <div className="header-container">
        <div className="title">PhnyX RAG에게 무엇이든 물어보세요.</div>
        <SearchForm editSearch={editSearch}/>
      </div>
    </div>
  );
};

export default Search;
