import React from 'react';
import './SearchHistory.css';

const SearchHistory: React.FC = () => {
  return (
    <div className="search-history-container">
      <button className="search-history">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            fill="none"
          >
            <path
              d="M28.3333 28.3333L35 35M5 18.3333C5 21.8696 6.40476 25.2609 8.90524 27.7614C11.4057 30.2619 14.7971 31.6667 18.3333 31.6667C21.8696 31.6667 25.2609 30.2619 27.7614 27.7614C30.2619 25.2609 31.6667 21.8696 31.6667 18.3333C31.6667 14.7971 30.2619 11.4057 27.7614 8.90524C25.2609 6.40476 21.8696 5 18.3333 5C14.7971 5 11.4057 6.40476 8.90524 8.90524C6.40476 11.4057 5 14.7971 5 18.3333Z"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="search-history-text">검색</div>
      </button>
    </div>
  );
};

export default SearchHistory;
