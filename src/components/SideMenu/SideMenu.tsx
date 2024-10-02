import React from "react";
import SearchHistory from "../SearchHistory/SearchHistory";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";
// import HistoryButton from "../HistoryButton/HistoryButton.tsx";
import ProfileButton from "../ProfileButton/ProfileButton.tsx";

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to the user profile page
  const userProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="menu">
      <div className="menu-top-logo">
        <SearchHistory />
        {/* <HistoryButton /> */}
      </div>
      <div className="menu-decor" />
      <div onClick={userProfile}>
        <ProfileButton />
      </div>
    </div>
  );
};

export default SideMenu;
