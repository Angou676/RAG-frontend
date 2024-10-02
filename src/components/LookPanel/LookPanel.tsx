import React, { useRef, useEffect, useState } from "react";
import "./LookPanel.css";
import ReturnBack from "../../assets/ReturnBack";
import API_BASE_URL from "../../config";
import axios from 'axios';
import Spinner from "../Spinner/Spinner";
interface LookPanelProps {
  onClose: () => void;
  retrieved_chunk: {
    original_name: string;
    chunk_text: string;
    doc_id: string;
  };
  panelWidth: number; 
  setPanelWidth: (width: number) => void;
}

const LookPanel: React.FC<LookPanelProps> = ({
  onClose,
  retrieved_chunk,
  panelWidth, 
  setPanelWidth, 
}) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const initialWidth = useRef(panelWidth);
  const minWidth = 32;
  const maxWidth = 55;

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get_file`, {
          params: {
            doc_id: retrieved_chunk.doc_id
          },
          responseType: 'blob' // Specify that the response should be treated as a Blob
        });
        
        const blob = response.data; // Get the blob from the response
        const imageUrl = URL.createObjectURL(blob); // Convert the blob to a URL
        setImageSrc(imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    setImageSrc(null); // Reset the image source
    fetchImage(); // Call the function to fetch the image
  }, [retrieved_chunk.doc_id]); // Fetch when the doc_id changes

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing.current) {
      const diffX = event.clientX - startX.current;
      let newWidth = initialWidth.current - (diffX / window.innerWidth) * 100;

      if (newWidth < minWidth) newWidth = minWidth;
      if (newWidth > maxWidth) newWidth = maxWidth;

      setPanelWidth(newWidth); 
    }
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = event.clientX;
    initialWidth.current = panelWidth; 
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    if (isResizing.current) {
      isResizing.current = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "";
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="look-panel"
      style={{ width: `${panelWidth}vw` }}
      ref={panelRef}
    >
      <div className="look-panel-resizer" onMouseDown={handleMouseDown} />

      <div className="look-panel-header">
        <h4>{retrieved_chunk.original_name}</h4>
        <button className="close-button" onClick={onClose}>
          <ReturnBack />
        </button>
      </div>

      <div className="look-panel-content">
        {imageSrc ? (
          <iframe src={imageSrc} title="PDF Preview" />
        ) : (
          <div className="spinner-container">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default LookPanel;
