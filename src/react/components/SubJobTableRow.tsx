// src/react/components/SubJobTableRow.tsx
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getFrameById } from "../api/frameAPI";
import { getCushionById } from "../api/cushionAPI";
import { getUpholsteryById } from "../api/upholsteryAPI";

// map each status label to its CSS class
const STATUS_CLASS: Record<string, string> = {
  "Upholstery Cut":    "status-cut",
  "Body Upholstered":  "status-upholstered",
  "Upholstery Sewn":   "status-sewn",
  "Frame Foamed":      "status-foamed",
  "Complete":          "status-complete",
  "In Production":     "status-production",
};

interface SubJobTableRowProps {
  subJobParam: SubJob;
  index: number;
  onAddFrameClick: (subJobId: String, subJobDetail: String) => void;
  onAddCushionClick: (subJobId: String, subJobDetail: String) => void;
  onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void;
  onEditSubJobClick: (subJob: SubJob) => void;
  onEditFrameClick: (frame: Frame) => void;
  onEditCushionClick: (cushion: Cushion) => void;
  onEditUpholsteryClick: (upholstery: Upholstery) => void;
}

const SubJobTableRow: React.FC<SubJobTableRowProps> = ({
  subJobParam,
  index,
  onAddFrameClick,
  onAddCushionClick,
  onAddUpholsteryClick,
  onEditSubJobClick,
  onEditFrameClick,
  onEditCushionClick,
  onEditUpholsteryClick,
}) => {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [cushions, setCushions] = useState<Cushion[]>([]);
  const [upholstery, setUpholstery] = useState<Upholstery[]>([]);

  useEffect(() => {
    async function fetchComponents() {
      const [u, f, c] = await Promise.all([
        Promise.all((subJobParam.upholsteryList || []).map(getUpholsteryById)),
        Promise.all((subJobParam.frameList      || []).map(getFrameById)),
        Promise.all((subJobParam.cushionList    || []).map(getCushionById)),
      ]);
      setUpholstery(u.filter(Boolean) as Upholstery[]);
      setFrames    (f.filter(Boolean) as Frame[]);
      setCushions  (c.filter(Boolean) as Cushion[]);
    }
    fetchComponents();
  }, [
    subJobParam.upholsteryList,
    subJobParam.frameList,
    subJobParam.cushionList,
    subJobParam._id,
  ]);

  /**
   * Handles click on the file link by sending a message to the main process
   * to open the URL in the system's default browser.
   * @param url The URL to open.
   */
  const handleLinkClick =
    (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault(); // Prevents the default HTML link behavior

      if (window.electron) {
        // --- Corrected Line ---
        // Ensure the URL is a primitive string before sending it to the main process
        window.electron.openExternalLink(String(url));
      } else {
        window.open(url, "_blank");
      }
    };

  return (
    <>
      <div className="sub-job-title">
        <h4>Component #{index + 1}</h4>
        <Pencil
          className="edit-icon"
          onClick={() => onEditSubJobClick(subJobParam)}
        />
      </div>
      <div className="job-component-row">
        {/* === SUB-JOB COLUMN === */}
        {/* JOB CARD */}
        <div className="component-card">
          {/* JOB CARD */}
          <div className="component-section">
            <div className="card-header">
              <h4>Job</h4>
            </div>
            <p>{subJobParam.subJobDetail}</p>
          </div>

          {/* NOTES CARD */}
          <div className="component-section">
            <div className="card-header">
              <h4>Notes</h4>
            </div>
            <p>{subJobParam.note}</p>
          </div>

          {/* FILES CARD */}
          <div className="component-section">
            <div className="card-header">
              <h4>Links</h4>
              <p></p>
            </div>
            {/* <p><i>{subJobParam.file || "No file uploaded"}</i></p> */}
            {subJobParam.file && subJobParam.file.length > 0
              ? subJobParam.file.map((fileUrl, index) => (
                  <div key={index}>
                    <a
                      href={fileUrl}
                      onClick={handleLinkClick(fileUrl)}
                      className="file-link"
                    >
                      {fileUrl}
                      <p></p>
                    </a>
                  </div>
                ))
              : "—"}
          </div>
        </div>

        {/* === FRAME COLUMN === */}
        <div className="component-card">
          {frames.map((frame, index) => (
            <div key={String(frame._id)} className="component-section">
              <div className="card-header">
                <h4>Frame {index + 1}</h4>
                <Pencil
                  className="edit-icon"
                  onClick={() => onEditFrameClick(frame)}
                />
              </div>
              <p>
                <strong>Supplier:</strong> {frame.supplier}
              </p>
              <p>
                <strong>Ordered:</strong>{" "}
                {frame.orderedDate
                  ? new Date(frame.orderedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>

              <p>
                <strong>Received:</strong>{" "}
                {frame.receivedDate
                  ? new Date(frame.receivedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>
          ))}
          <button
            className="add-btn"
            onClick={() =>
              onAddFrameClick(
                subJobParam._id as String,
                subJobParam.subJobDetail as String
              )
            }
          >
            +
          </button>
        </div>

        {/* === CUSHION COLUMN === */}
        <div className="component-card">
          {cushions.map((cushion, index) => (
            <div key={String(cushion._id)} className="component-section">
              <div className="card-header">
                <h4>Cushion {index + 1}</h4>
                <Pencil
                  className="edit-icon"
                  onClick={() => onEditCushionClick(cushion)}
                />
              </div>
              <p>
                <strong>Ordered:</strong>{" "}
                {cushion.orderedDate
                  ? new Date(cushion.orderedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
              <p>
                <strong>Received:</strong>{" "}
                {cushion.receivedDate
                  ? new Date(cushion.receivedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>
          ))}
          <button
            className="add-btn"
            onClick={() =>
              onAddCushionClick(
                subJobParam._id as String,
                subJobParam.subJobDetail as String
              )
            }
          >
            +
          </button>
        </div>

        {/* === UPHOLSTERY COLUMN === */}
        <div className="component-card">
          {upholstery.map((u, index) => (
            <div key={String(u._id)} className="component-section">
              <div className="card-header">
                <h4>Upholstery {index + 1}</h4>
                <Pencil
                  className="edit-icon"
                  onClick={() => onEditUpholsteryClick(u)}
                />
              </div>
              <p>
                <strong>Type:</strong> {u.type}
              </p>
              <p>
                <strong>Description:</strong> {u.description}
              </p>
              <p>
                <strong>Ordered:</strong>{" "}
                {u.orderedDate
                  ? new Date(u.orderedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
              <p>
                <strong>Received:</strong>{" "}
                {u.receivedDate
                  ? new Date(u.receivedDate).toLocaleDateString("en-GB")
                  : "—"}
              </p>
            </div>
          ))}
          <button
            className="add-btn"
            onClick={() =>
              onAddUpholsteryClick(
                subJobParam._id as String,
                subJobParam.subJobDetail as String
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default SubJobTableRow;
