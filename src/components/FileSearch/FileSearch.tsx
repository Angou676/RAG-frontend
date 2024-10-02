import React, { useState, useEffect } from "react";
import "./FileSearch.css";
import { ReactComponent as List } from "../../assets/Profile/List.svg";
import { ReactComponent as Grid } from "../../assets/Profile/Grid.svg";
import { ReactComponent as PDFIcon } from "../../assets/Profile/PDFIcon.svg";
import { ReactComponent as ThreeDots } from "../../assets/Profile/ThreeDots.svg";
import API_BASE_URL from "../../config";
import axios from "axios";

interface File {
  name: string;
  documentGroup: string;
  uploadDate: Date;
  status: string;
}

const FileSearch: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("latest");
  const [view, setView] = useState<"list" | "grid">("list");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [documentGroupFilter, setDocumentGroupFilter] = useState<string>("");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("");

  const parseTimestamp = (timestamp: string) => {
    const year = parseInt(timestamp.slice(0, 4), 10);
    const month = parseInt(timestamp.slice(4, 6), 10) - 1; // JS months are 0-based
    const day = parseInt(timestamp.slice(6, 8), 10);
    const hour = parseInt(timestamp.slice(9, 11), 10);
    const minute = parseInt(timestamp.slice(11, 13), 10);
    const second = parseInt(timestamp.slice(13, 15), 10);

    return new Date(year, month, day, hour, minute, second);
  };
  
  // Fetch files from API on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/list_recent_file_uploads`
        );
        const fetchedFiles = response.data.documents.map((doc: any) => ({
          name: doc.original_name,
          documentGroup: doc.document_group_name,
          uploadDate: parseTimestamp(doc.timestamp), // Replace _ with - for proper Date parsing
          status: doc.status,
        }));
        setFiles(fetchedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  // Function to handle sort order change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  // Function to sort files
  const sortedFiles = () => {
    let filteredFiles = files;

    // Apply search filter
    if (searchTerm) {
      filteredFiles = filteredFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply document group filter
    if (documentGroupFilter) {
      filteredFiles = filteredFiles.filter(
        (file) => file.documentGroup === documentGroupFilter
      );
    }

    // Apply file type filter (mocking with "PDF" as all are PDFs for now)
    if (fileTypeFilter === "PDF") {
      filteredFiles = filteredFiles.filter((file) =>
        file.name.endsWith(".pdf")
      );
    }

    return [...filteredFiles].sort((a, b) => {
      switch (sortOrder) {
        case "latest":
          return b.uploadDate.getTime() - a.uploadDate.getTime();
        case "earliest":
          return a.uploadDate.getTime() - b.uploadDate.getTime();
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  // Function to handle view change (list or grid)
  const handleViewChange = (viewType: "list" | "grid") => {
    setView(viewType);
  };

  return (
    <div className="file-search-container">
      {/* First row: Search, search button, document group filter, and file type filter */}
      <div className="file-search-filters">
        <input
          type="text"
          className="search-bar"
          placeholder="키워드 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="select-and-search-container">
          <select
            className="document-group-filter"
            value={documentGroupFilter}
            onChange={(e) => setDocumentGroupFilter(e.target.value)}
          >
            <option value="">문서 그룹</option> {/*document group*/}
            <option value="Group 1">Group 1</option>
            <option value="Group 2">Group 2</option>
            <option value="Group 3">Group 3</option>
          </select>

          <select
            className="file-type-filter"
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
          >
            <option value="">문서 유형</option> {/*file group*/}
            <option value="PDF">PDF</option>
            <option value="DOC">DOC</option>
          </select>

          <button className="search-button" onClick={() => sortedFiles()}>
            검색
          </button>
        </div>
      </div>

      {/* Second row: Sort order and view toggle */}
      <div className="file-search-header">
        <div className="header-buttons-container">
          <select onChange={handleSortChange} value={sortOrder}>
            <option value="latest">정렬 기준</option>
            <option value="earliest">Earliest Uploaded</option>
            <option value="az">Alphabetical A-Z</option>
            <option value="za">Alphabetical Z-A</option>
          </select>

          <div className="view-buttons">
            <button onClick={() => handleViewChange("list")}>
              <List />
            </button>
            <button onClick={() => handleViewChange("grid")}>
              <Grid />
            </button>
          </div>
        </div>
      </div>

      {/* File list */}
      <div className={`file-search-content ${view}`}>
        {view === "list" && (
          <div className="file-search-content-header">
            <div className="header-name">이름</div>
            <div className="header-group">문서 그룹</div>
            <div className="header-date">업로드 날짜</div>
            <div className="header-place-holder" />
          </div>
        )}

        {sortedFiles().map((file, index) => (
          <div className={`file-item ${view}`} key={index}>
            {/* Left section with icon and name */}
            <div className="file-info">
              <div className="file-icon">
                <PDFIcon />
              </div>
              <p className="file-name">{file.name}</p>
            </div>

            {/* Middle section with document group */}
            {view === "list" && (
              <p className="document-group">{file.documentGroup}</p>
            )}

            {/* Right section with upload date */}
            {view === "list" && (
              <p className="upload-date">
                {file.uploadDate.toLocaleDateString()}
              </p>
            )}

            {/* Three dots for more options */}
            <div className="more-options">
              <ThreeDots />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileSearch;
