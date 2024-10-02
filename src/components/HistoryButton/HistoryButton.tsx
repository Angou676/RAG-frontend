import React from "react";
import "./HistoryButton.css";

const HistoryButton: React.FC = () => {
  return (
    <div className="history-container">
      <button className="history-second">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 34 38"
            fill="none"
          >
            <path
              d="M1.70001 15.6C1.70001 9.1893 1.70001 5.9831 3.69241 3.9924C5.68481 2.0017 8.88931 2 15.3 2H18.7C25.1107 2 28.3169 2 30.3076 3.9924C32.2983 5.9848 32.3 9.1893 32.3 15.6V22.4C32.3 28.8107 32.3 32.0169 30.3076 34.0076C28.3152 35.9983 25.1107 36 18.7 36H15.3C8.88931 36 5.68311 36 3.69241 34.0076C1.70171 32.0152 1.70001 28.8107 1.70001 22.4V15.6Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              d="M10.2 15.6001H23.8M10.2 22.4001H18.7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="history-text">문서 관리</div>
      </button>
    </div>
  );
};

export default HistoryButton;
