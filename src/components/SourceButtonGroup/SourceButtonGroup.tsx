import React, { useRef } from "react";
import "./SourceButtonGroup.css";

interface RetrievedChunk {
  original_name: string;
  doc_id: string;
  page_num: number;
  chunk_text: string;
  size?: number;
  document_group_name: string;
  id: number;
}

interface SourceButtonProps {
  document: RetrievedChunk;
  pages: number[];
  isSelected: boolean;
  onClick: (doc: RetrievedChunk) => void;
}

const SourceButton: React.FC<SourceButtonProps> = ({
  document,
  pages,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={`document-button ${isSelected ? "selected" : ""}`}
      onClick={() => onClick(document)}
    >
      <div className="button-text-container">
        <strong>{document.original_name}</strong>
        <p>{`${document.id} • 페이지 ${pages.join(", ")}`}</p>
      </div>
    </button>
  );
};

interface SourceButtonGroupProps {
  retrieved_chunks: RetrievedChunk[];
  onButtonClick: (selectedDoc: RetrievedChunk) => void;
  onDeselect: () => void;
  selectedButtonId: number | null; 
  setSelectedButtonId: (id: number | null) => void; 
}

const SourceButtonGroup: React.FC<SourceButtonGroupProps> = ({
  retrieved_chunks,
  onButtonClick,
  onDeselect,
  selectedButtonId,
  setSelectedButtonId,
}) => {
  // Group documents by doc_id and collect pages
  const groupedDocuments = retrieved_chunks.reduce((acc, doc) => {
    if (!acc[doc.doc_id]) {
      acc[doc.doc_id] = {
        document: doc,
        pages: [],
      };
    }
    acc[doc.doc_id].pages.push(doc.page_num);
    return acc;
  }, {} as Record<string, { document: RetrievedChunk; pages: number[] }>);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const uniqueDocuments = Object.values(groupedDocuments);

  const handleButtonClick = (selectedDoc: RetrievedChunk) => {
    if (selectedButtonId === selectedDoc.id) {
      setSelectedButtonId(null); 
      onDeselect();
    } else {
      setSelectedButtonId(selectedDoc.id); 
      onButtonClick(selectedDoc); 
    }
  };

  return (
    <div className="scrollable-button-group-wrapper">
      <button className="scroll-button left" onClick={scrollLeft}>
        <div className="icon-scroll">&#8249;</div>
      </button>
      <div className="scrollable-button-group">
        <div className="document-button-container" ref={scrollContainerRef}>
          {uniqueDocuments.map(({ document, pages }) => (
            <SourceButton
              key={document.id}
              document={document}
              pages={pages}
              isSelected={selectedButtonId === document.id} 
              onClick={handleButtonClick}
            />
          ))}
        </div>
      </div>
      <button className="scroll-button right" onClick={scrollRight}>
      <div className="icon-scroll">&#8250;</div>
      </button>
    </div>
  );
};

export default SourceButtonGroup;
