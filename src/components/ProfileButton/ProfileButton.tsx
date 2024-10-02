import React from "react";
import "./ProfileButton.css";

const ProfileButton: React.FC = () => {
  return (
    <div className="profile-button-container">
      <button className="profile-button-second">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 34 38"
            fill="none"
          >
            <path
              d="M1.88892 36.0001V34.1112C1.88892 27.8589 6.97003 22.7778 13.2222 22.7778H20.7778C27.03 22.7778 32.1111 27.8589 32.1111 34.1112V36.0001"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 17.1111C12.8256 17.1111 9.44446 13.73 9.44446 9.55556C9.44446 5.38111 12.8256 2 17 2C21.1745 2 24.5556 5.38111 24.5556 9.55556C24.5556 13.73 21.1745 17.1111 17 17.1111Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="profile-button-text">계정</div>
      </button>
    </div>
  );
};

export default ProfileButton;
