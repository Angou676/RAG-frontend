import React, { useState } from "react";
import "./DocumentUpload.css";
import { ReactComponent as Upload } from "../../assets/Profile/Upload.svg";
import UploadPopup from "../UploadPopup/UploadPopup"; 

interface DocumentUploadProps {
  onFilesUpload: (files: File[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onFilesUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showPopup, setShowPopup] = useState(false); 

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files); // Set the dropped files as selected
    setShowPopup(true); // Automatically show the popup when files are dropped
  };

  const handleUploadClick = () => {
    setShowPopup(true); // Show the popup when upload button is clicked
  };

  const handleClosePopup = () => {
    setSelectedFiles([]);
    setShowPopup(false); // Close the popup
  };

  const handleConfirmUpload = (files: File[], category: string) => {
    console.log("Files:", files, "Category:", category);
    setShowPopup(false); // Close the popup
    onFilesUpload(files); // Pass the uploaded files to the parent component
  };

  return (
    <>
      <div
        className={`upload-container ${dragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <button type="button" className="upload-button" onClick={handleUploadClick}>
            <Upload />
            업로드
          </button>
          <p>또는 파일을 드롭하세요</p>
        </div>
      </div>

      {/* Conditionally render the popup and pass selected files */}
      {showPopup && (
        <UploadPopup
          onClose={handleClosePopup}
          onUploadConfirm={handleConfirmUpload}
          initialSelectedFiles={selectedFiles} // Pass the selected files as props
        />
      )}
    </>
  );
};

export default DocumentUpload;
