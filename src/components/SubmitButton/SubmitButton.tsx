import React from "react";
import "./SubmitButton.css";

interface SubmitButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick }) => {
  return (
    <button type="submit" onClick={onClick} className="submit-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="58"
        height="58"
        viewBox="0 0 58 58"
        fill="none"
      >
        <rect
          x="58"
          width="58"
          height="58"
          rx="10"
          transform="rotate(90 58 0)"
          fill="#251659"
        />
        <path
          d="M14 29.25L44 29.25M44 29.25L32.75 40.5M44 29.25L32.75 18"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default SubmitButton;
