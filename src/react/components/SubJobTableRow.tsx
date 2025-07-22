// src/react/components/SubJobTableRow.tsx
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getFrameById } from "../api/frameAPI";
import { getCushionById } from "../api/cushionAPI";
import { getUpholsteryById } from "../api/upholsteryAPI";


// map each status label to its CSS class
const STATUS_CLASS: Record<string, string> = {
  "Upholstery Cut":   "status-cut",
  "Body Upholstered": "status-upholstered",
  "Upholstery Sewn":  "status-sewn",
  "Frame Foamed":     "status-foamed",
  "Complete":         "status-complete",
  "In Production":    "status-production",
};

interface SubJobTableRowProps {
  subJobParam: SubJob;
  index: number;
  onAddFrameClick: (subJobId: string, subJobDetail: string) => void;
  onAddCushionClick: (subJobId: string, subJobDetail: string) => void;
  onAddUpholsteryClick: (subJobId: string, subJobDetail: string) => void;
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

  const handleLinkClick =
    (url: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (window.electron) {
        window.electron.openExternalLink(url);
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
        {/* DETAILS */}
        <div className="component-card">
          <div className="component-section">
            <div className="card-header"><h4>Job</h4></div>
            <p>{subJobParam.subJobDetail}</p>
          </div>
          <div className="component-section">
            <div className="card-header"><h4>Notes</h4></div>
            <p>{subJobParam.note}</p>
          </div>
          <div className="component-section">
            <div className="card-header"><h4>Links</h4></div>
            {subJobParam.file && subJobParam.file.length > 0 ? (
              subJobParam.file.map((url, i) => (
                <div className="links-container" key={i}>
                  <a
                    href={url}
                    onClick={handleLinkClick(url)}
                    className="file-link"
                  >
                    {url}
                  </a>
                </div>
              ))
            ) : (
              <p>—</p>
            )}
          </div>
        </div>

        {/* FRAME COLUMN */}
        <div className="component-card">
          {frames.map((frame, idx) => {
            const statusClass =
              STATUS_CLASS[(frame.status ?? "") as string] ?? "";
            return (
              <div
                key={frame._id}
                className={`component-section ${statusClass}`}
              >
                <div className="card-header">
                  <h4>Frame {idx + 1}</h4>
                  <Pencil
                    className="edit-icon"
                    onClick={() => onEditFrameClick(frame)}
                  />
                </div>
                <p><strong>Supplier:</strong> {frame.supplier}</p>
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
            );
          })}
          <button
            className="add-btn"
            onClick={() =>
              onAddFrameClick(
                subJobParam._id as string,
                subJobParam.subJobDetail
              )
            }
          >
            +
          </button>
        </div>

        {/* CUSHION COLUMN */}
        <div className="component-card">
          {cushions.map((cushion, idx) => {
            const statusClass =
              STATUS_CLASS[(cushion.status ?? "") as string] ?? "";
            return (
              <div
                key={cushion._id}
                className={`component-section ${statusClass}`}
              >
                <div className="card-header">
                  <h4>Cushion {idx + 1}</h4>
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
            );
          })}
          <button
            className="add-btn"
            onClick={() =>
              onAddCushionClick(
                subJobParam._id as string,
                subJobParam.subJobDetail
              )
            }
          >
            +
          </button>
        </div>

        {/* UPHOLSTERY COLUMN */}
        <div className="component-card">
          {upholstery.map((u, idx) => {
            const statusClass =
              STATUS_CLASS[(u.status ?? "") as string] ?? "";
            return (
              <div
                key={u._id}
                className={`component-section ${statusClass}`}
              >
                <div className="card-header">
                  <h4>Upholstery {idx + 1}</h4>
                  <Pencil
                    className="edit-icon"
                    onClick={() => onEditUpholsteryClick(u)}
                  />
                </div>
                <p><strong>Type:</strong> {u.type}</p>
                <p><strong>Description:</strong> {u.description}</p>
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
            );
          })}
          <button
            className="add-btn"
            onClick={() =>
              onAddUpholsteryClick(
                subJobParam._id as string,
                subJobParam.subJobDetail
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
