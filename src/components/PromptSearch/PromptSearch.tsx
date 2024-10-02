import React from "react";
import "./PromptSearch.css";
import prompt from "../../assets/DummyData/promptQuestions.json";

interface PromptSearchProps {
  handlePromptClick: (question: string) => void;
}

const PromptSearch: React.FC<PromptSearchProps> = ({
  handlePromptClick,
}) => {
  return (
    <>
      <div className="error-box">
        <p className="example-text">Get started with an example below</p>
       
      </div>
      <div className="prompt-box">
        {prompt.prompt?.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => handlePromptClick(prompt.question)}
          >
            {prompt.question}
          </button>
        ))}
      </div>
    </>
  );
};

export default PromptSearch;
