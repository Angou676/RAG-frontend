import React from 'react';

const ToggleIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
    >
      <path
        d="M1 9.8C1 5.6519 1 3.5773 2.2892 2.2892C3.5784 1.0011 5.6519 1 9.8 1H12C16.1481 1 18.2227 1 19.5108 2.2892C20.7989 3.5784 20.8 5.6519 20.8 9.8V14.2C20.8 18.3481 20.8 20.4227 19.5108 21.7108C18.2216 22.9989 16.1481 23 12 23H9.8C5.6519 23 3.5773 23 2.2892 21.7108C1.0011 20.4216 1 18.3481 1 14.2V9.8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M6.5 9.8H15.3M6.5 14.2H12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ToggleIcon;
