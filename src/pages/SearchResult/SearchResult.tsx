import React, { useState } from "react";
import axios from "axios";
import "./SearchResult.css";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
import SideMenu from "../../components/SideMenu/SideMenu";
import SearchForm from "../../components/SearchForm/SearchForm";
import ScrollableSection from "../../components/ScrollableSection/ScrollableSection";
import SourcePanel from "../../components/SourcePanel/SourcePanel";
import LookPanel from "../../components/LookPanel/LookPanel";
import { useNavigate, useLocation } from "react-router-dom";
import ThumbsUpIcon from "../../assets/SearchResult/ThumbsUp";
import ThumbsDownIcon from "../../assets/SearchResult/ThumbsDown";
import API_BASE_URL from "../../config";
import SubmitButton from "../../assets/SearchResult/SubmitButton";
import CancelButton from "../../assets/SearchResult/CancelButton";
import EditButton from "../../assets/SearchResult/EditButton";

//generated_generated_response

interface RetrievedChunk {
  original_name: string;
  doc_id: string;
  page_num: number;
  chunk_text: string;
  document_group_name: string;
  id: number;
  doc_type?: string;
  score?: GLfloat;
  timestamp?: string; // timestamp //needs to turn into Date in FileManager.tsx
}

const SearchResult: React.FC = () => {
  const location = useLocation(); // Use location to get the data passed from SearchForm
  const navigate = useNavigate();

  // Access the passed state containing the API results
  const generated_response: string =
    location.state?.generated_response || "곧 지원 예정입니다.";
  const retrieved_chunks: RetrievedChunk[] =
    location.state?.retrieved_chunks || [];
  const chatStrid = location.state?.chatStrid || ""; // Assuming this is passed from SearchForm

  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(
    null
  );
  const [isLookPanelVisible, setIsLookPanelVisible] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  const [lookPanelWidth, setLookPanelWidth] = useState(32); // Manage the width for LookPanel and dynamic resize

  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false); // Popup state
  const [userFeedback, setUserFeedback] = useState<string>(""); // User feedback state

  const [activeThumbsUp, setActiveThumbsUp] = useState(false);
  const [activeThumbsDown, setActiveThumbsDown] = useState(false);

  const [editSearch, setEditSearch] = useState<string>("");

  const handleCloseSourcePanel = () => {
    setSelectedChunk(null);
    setSelectedButtonId(null);
  };

  const handleLookClick = () => {
    setIsLookPanelVisible(true); // Show LookPanel
  };

  const handleCloseLookPanel = () => {
    setIsLookPanelVisible(false); // Hide LookPanel and show SourcePanel
  };

  const handleDownloadClick = async () => {
    try {
      if (!selectedChunk) return;
      const response = await axios.get(`${API_BASE_URL}/get_file`, {
        params: {
          doc_id: selectedChunk.doc_id,
        },
        responseType: "blob", // Specify that the response should be treated as a Blob
      });

      const blob = response.data; // Get the blob from the response
      const downloadUrl = URL.createObjectURL(blob); // Convert the blob to a URL
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute(
        "download",
        `document_${selectedChunk.original_name}.pdf`
      ); // Set the filename for the download
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleDocumentSelect = (selectedDocument: RetrievedChunk | null) => {
    setSelectedChunk(selectedDocument); // Set the selected chunk directly
    setSelectedButtonId(selectedDocument ? selectedDocument.id : null);
    setShowFeedbackPopup(false);
    setActiveThumbsDown(false);
    setActiveThumbsUp(false);
  };

  const navigateHome = () => {
    navigate("/");
  };

  const processedChunks = retrieved_chunks.map((chunk, index) => ({
    ...chunk,
    id: chunk.id || index + 1, // Add id if missing, using index
  }));

  const handleThumbClick = async (rating: number) => {
    setShowFeedbackPopup(true); // Show feedback popup when thumbs are clicked

    // Set active state based on the rating
    if (rating === 5) {
      setActiveThumbsUp(true);
      setActiveThumbsDown(false);
    } else if (rating === 1) {
      setActiveThumbsDown(true);
      setActiveThumbsUp(false);
    }

    setSelectedChunk(null);
    setSelectedButtonId(null);

    console.log("Rating:", rating);

    await axios.post(`${API_BASE_URL}/rate_chat`, {
      chat_strid: chatStrid, // Use chat_strid from SearchForm
      user_rating: rating, // 5 for like, 1 for dislike
    });
  };

  // Handle Feedback Submit
  const handleFeedbackSubmit = async () => {
    try {
      console.log(userFeedback);
      await axios.post(
        `${API_BASE_URL}/rate_chat`,
        {
          chat_strid: chatStrid, // Use chat_strid from SearchForm
          user_feedback: userFeedback, // Feedback entered by user
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // if (response.status === 200) {
      // alert("Feedback submitted successfully!");
      // } else {
      // alert("Failed to submit feedback.");
      // }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback.");
    }

    setShowFeedbackPopup(false); // Close the popup after submitting
    setUserFeedback(""); // Reset feedback input
  };

  if (location.state?.original_query === undefined) {
    navigate("/");
  }

  return (
    <div className="search-result-page">
      <div className="logo">
        <Logo onClick={navigateHome} />
      </div>

      <div className="menu-container">
        <SideMenu />
      </div>

      <div className="entire-body-section">
        <div
          className="scrollable-container"
          style={{
            width: `calc(100vw - ${lookPanelWidth}vw)`,
          }}
        >
          <div className="query">
            <div className="query-text" >
              {location.state?.original_query || "No Query"}
            </div>
            <span
              className="edit-icon"
              onClick={() => setEditSearch(location.state?.original_query)}
            >
              <EditButton />
            </span>
          </div>

          <div className="feedback-box">
            <button
              className={`thumbs-up-button ${activeThumbsUp ? "active" : ""}`}
              onClick={() => handleThumbClick(5)} // Like -> 5 rating
            >
              <ThumbsUpIcon />
            </button>
            <button
              className={`thumbs-down-button ${
                activeThumbsDown ? "active" : ""
              }`}
              onClick={() => handleThumbClick(1)} // Dislike -> 1 rating
            >
              <ThumbsDownIcon />
            </button>
          </div>
          <ScrollableSection
            generated_response={generated_response}
            retrieved_chunks={processedChunks}
            onDocumentSelect={handleDocumentSelect}
            isLookPanelOpen={isLookPanelVisible}
            selectedButtonId={selectedButtonId}
            setSelectedButtonId={setSelectedButtonId}
          />

          <div className="search-bar-container">
            <SearchForm editSearch={editSearch} />
          </div>
        </div>

        <div className="source-panel-or-look-panel">
          {/* Show SourcePanel when LookPanel is not visible */}
          {!isLookPanelVisible && selectedChunk && (
            <div>
              <SourcePanel
                retrieved_chunks={selectedChunk}
                onLookClick={handleLookClick}
                onCloseClick={handleCloseSourcePanel}
                onDownloadClick={handleDownloadClick}
              />
            </div>
          )}

          {/* Show LookPanel when visible */}
          {isLookPanelVisible && selectedChunk && (
            <LookPanel
              retrieved_chunk={selectedChunk}
              onClose={handleCloseLookPanel}
              panelWidth={lookPanelWidth}
              setPanelWidth={setLookPanelWidth}
            />
          )}

          {/* Feedback Popup */}
          {showFeedbackPopup && (
            <div className="feedback-popup">
              <textarea
                value={userFeedback}
                onChange={(e) => setUserFeedback(e.target.value)}
                placeholder="댓글을 남겨주세요."
              />
              <div className="feedback-submit-btn">
                <button
                  className="submit-cancel-buttons"
                  onClick={handleFeedbackSubmit}
                >
                  <SubmitButton />
                </button>
                <button
                  className="submit-cancel-buttons"
                  onClick={() => {
                    setShowFeedbackPopup(false);
                    setActiveThumbsDown(false);
                    setActiveThumbsUp(false);
                  }}
                >
                  <CancelButton />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
