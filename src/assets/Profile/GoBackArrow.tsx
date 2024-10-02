import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

const GoBackArrow: React.FC<IconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 19"
      fill="none"
      {...props} // Spread props for flexibility, allowing className, style, etc.
    >
      <path
        d="M9 17.5L1 9.5L9 1.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GoBackArrow;
