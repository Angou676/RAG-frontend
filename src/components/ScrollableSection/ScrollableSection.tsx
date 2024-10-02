import React from "react";
import "./ScrollableSection.css";
import { ReactComponent as SourceIcon } from "../../assets/SearchResult/SourceIcon.svg";
import { ReactComponent as AnswerIcon } from "../../assets/SearchResult/AnswerIcon.svg";
import { ReactComponent as DocumentIcon } from "../../assets/SearchResult/DocumentsIcon.svg";
import SourceButtonGroup from "../SourceButtonGroup/SourceButtonGroup";
import ReactMarkdown from "react-markdown";

interface RetrievedChunk {
  original_name: string;
  doc_id: string;
  page_num: number;
  chunk_text: string;
  size?: number;
  document_group_name: string;
  id: number;
}

interface ScrollableSectionProps {
  generated_response: string;
  retrieved_chunks: Array<RetrievedChunk>;
  onDocumentSelect: (doc: RetrievedChunk | null) => void;
  isLookPanelOpen: boolean; // To handle LookPanel width logic
  selectedButtonId: number | null; // For managing selected button state
  setSelectedButtonId: (id: number | null) => void; // For updating selected button state
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({
  generated_response,
  retrieved_chunks,
  onDocumentSelect,
  // isLookPanelOpen,
  selectedButtonId,
  setSelectedButtonId,
}) => {
  // Handle deselecting a document
  const handleDeselect = () => {
    onDocumentSelect(null); 
    setSelectedButtonId(null); 
  };

  return (
    <div className="scrollable-section custom-scrollbar">
      {/* Box 1: Buttons with document names */}
      <div className="box-container">
        <h3>
          <i className="icon-class">
            <SourceIcon />
          </i>{" "}
          관련 자료
        </h3>
        <div className="document-button-container">
          <SourceButtonGroup
            retrieved_chunks={retrieved_chunks}
            onButtonClick={onDocumentSelect}
            onDeselect={handleDeselect} 
            selectedButtonId={selectedButtonId} 
            setSelectedButtonId={setSelectedButtonId} 
          />
        </div>
      </div>

      {/* Box 2: generated_response string */}
      <div className="box-container">
        <h3>
          <i className="icon-class">
            <AnswerIcon />
          </i>
          답변
        </h3>
        <p><ReactMarkdown>{generated_response}</ReactMarkdown></p>
      </div>

      {/* Box 3: Document titles and texts */}
      <div className="box-container">
        <h3>
          <i className="icon-class">
            <DocumentIcon />
          </i>
          참고 자료
        </h3>
        <div className="document-details-container">
          {retrieved_chunks.map((document) => (
            <div key={document.id} className="document-details">
              <strong>{`${document.id}. ${document.original_name} (페이지 ${document.page_num})`}</strong>
              <p>{document.chunk_text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollableSection;
