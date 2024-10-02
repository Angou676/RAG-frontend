import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import DocumentUpload from "../../components/DocumentUpload/DocumentUpload";
import FileManager from "../../components/FileManager/FileManager";
// import ProfileIcon from "../../assets/Profile/ProfileIcon";
// import ToggleIcon from "../../assets/Profile/ToggleIcon";
// import UploadIconSmall from "../../assets/Profile/UploadIconSmall";
// import SearchIcon from "../../assets/Profile/SearchIcon";
// import FileSearch from "../../components/FileSearch/FileSearch";
import GoBackArrow from "../../assets/Profile/GoBackArrow";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  // const [showButtons, setShowButtons] = useState<boolean>(false); // Toggle the visibility of extra buttons
  // const [selectedOption, setSelectedOption] = useState<string>(""); // Track selected option

  const userProfile = () => {
    navigate("/profile");
  };

  const handleFilesUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  // const toggleButtons = () => {
  //   setShowButtons(!showButtons); // Toggle showing the extra buttons
  //   setSelectedOption("toggle");
  // };

  // const profileButtons = () => {
  //   setSelectedOption("profile");
  //   setShowButtons(false);
  // };

  // const handleOptionClick = (option: string) => {
  //   setSelectedOption(option);
  // };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className="profile-page-container custom-scrollbar">
      <div className="top-navigation-bar">
        <button className="top-profile-button" onClick={userProfile} />
      </div>

      <div className="profile-page-side-menu">
        <div className="company-logo" />
        {/* Field Test Upload Button Only */}
        {/* <button className="selected">
          <UploadIconSmall />
          파일 업로드
        </button> */}

        {/* Toggle Button */}
        {/* <button
            className={`toggle-button ${
              selectedOption === "toggle" || showButtons ? "selected" : ""
            }`}
            onClick={toggleButtons}
          >
            <ToggleIcon />
            문서 관리
          </button> */}

        {/* Show the two buttons below the toggle button and above the profile button */}
        {/* {showButtons && (
            <div className="dropdown-options">
              <button
                className={selectedOption === "Option 1" ? "selected" : ""}
                onClick={() => handleOptionClick("Option 1")}
              >
                <UploadIconSmall />
                파일 업로드
              </button>
              <button
                className={selectedOption === "Option 2" ? "selected" : ""}
                onClick={() => handleOptionClick("Option 2")}
              >
                <SearchIcon />
                문서 검색
              </button>
            </div>
          )} */}

        {/* Profile Button */}
        {/* <button
            className={`profile-button ${
              selectedOption === "profile" ? "selected" : ""
            }`}
            onClick={profileButtons}
          >
            <ProfileIcon />
            유저 관리
          </button> */}

        <div className="return-home-button">
          <button onClick={navigateHome}>
            <GoBackArrow />
            PhnyX RAG 검색
          </button>
        </div>
      </div>

      <div className="profile-page-body-container">
        <h1>파일 업로드</h1>
        <>
          <DocumentUpload onFilesUpload={handleFilesUpload} />
          <FileManager />
        </>
      </div>

      {/* Conditionally show content based on selected option */}
      {/* {selectedOption && (
        <div className="profile-page-body-container">
          <h1>
            {(showButtons === true &&
              (selectedOption === "Option 1" ? "파일 업로드" : "")) ||
              (selectedOption === "Option 2" ? "문서 탐색" : "")}
          </h1>

          {selectedOption === "Option 1" && showButtons === true && (
            <>
              <DocumentUpload onFilesUpload={handleFilesUpload} />
              <FileManager />
            </>
          )}
          {selectedOption === "Option 2" && showButtons === true && (
            <FileSearch />
          )}
        </div>
      )} */}
    </div>
  );
};

export default Profile;
