import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { getFrameById } from "../api/frameAPI";
import { getCushionById } from "../api/cushionAPI";
import { getUpholsteryById } from "../api/upholsteryAPI";

interface SubJobTableRowProps {
  subJobParam: SubJob;
  onAddFrameClick: (subJobId: String, subJobDetail: String) => void;
  onAddCushionClick: (subJobId: String, subJobDetail: String) => void;
  onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void;
  onEditSubJobClick: (subJob: SubJob) => void;
  onEditFrameClick: (frame: Frame) => void;
  onEditCushionClick: (cushion: Cushion) => void;
  onEditUpholsteryClick: (upholstery: Upholstery) => void;
}

function SubJobTableRow({
  subJobParam,
  onAddFrameClick,
  onAddCushionClick,
  onAddUpholsteryClick,
  onEditSubJobClick,
  onEditFrameClick,
  onEditCushionClick,
  onEditUpholsteryClick,
}: SubJobTableRowProps) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [cushions, setCushions] = useState<Cushion[]>([]);
  const [upholstery, setUpholstery] = useState<Upholstery[]>([]);

  useEffect(() => {
    const fetchComponents = async () => {
      const fetchedUpholstery = await Promise.all(
        (subJobParam.upholsteryList || []).map(getUpholsteryById)
      );
      setUpholstery(fetchedUpholstery.filter(Boolean) as Upholstery[]);

      const fetchedFrames = await Promise.all(
        (subJobParam.frameList || []).map(getFrameById)
      );
      setFrames(fetchedFrames.filter(Boolean) as Frame[]);

      const fetchedCushions = await Promise.all(
        (subJobParam.cushionList || []).map(getCushionById)
      );
      setCushions(fetchedCushions.filter(Boolean) as Cushion[]);
    };

    fetchComponents();
  }, [
    subJobParam.upholsteryList,
    subJobParam.frameList,
    subJobParam.cushionList,
    subJobParam._id,
  ]);

  return (
    <div className="job-component-row">
      {/* === SUB-JOB COLUMN === */}
      {/* JOB CARD */}
      <div className="component-card">
        {/* JOB CARD */}
        <div className="component-section">
          <div className="card-header">
            <h4>Job</h4>
            <Pencil className="edit-icon" onClick={() => onEditSubJobClick(subJobParam)} />
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
            <h4>Files</h4>
          </div>
          <p>
            <i>{subJobParam.file || "No file uploaded"}</i>
          </p>

        </div>
      </div>


      {/* === FRAME COLUMN === */}
      <div className="component-card">
        {frames.map((frame, index) => (
          <div key={String(frame._id)} className="component-section">
            <div className="card-header">
              <h4>Frame {index + 1}</h4>
              <Pencil className="edit-icon" onClick={() => onEditFrameClick(frame)} />
            </div>
            <p><strong>Supplier:</strong> {frame.supplier}</p>
            <p><strong>Ordered:</strong> {frame.orderedDate ? String(frame.orderedDate) : "—"}</p>
            <p><strong>Received:</strong> {frame.receivedDate ? String(frame.receivedDate) : "—"}</p>

          </div>
        ))}
        <button className="add-btn" onClick={() => onAddFrameClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>+</button>
      </div>

      {/* === CUSHION COLUMN === */}
      <div className="component-card">
        {cushions.map((cushion, index) => (
          <div key={String(cushion._id)} className="component-section">
            <div className="card-header">
              <h4>Cushion {index + 1}</h4>
              <Pencil className="edit-icon" onClick={() => onEditCushionClick(cushion)} />
            </div>
            <p><strong>Ordered:</strong> {cushion.orderedDate ? String(cushion.orderedDate) : "—"}</p>
            <p><strong>Received:</strong> {cushion.receivedDate ? String(cushion.receivedDate) : "—"}</p>

          </div>
        ))}
        <button className="add-btn" onClick={() => onAddCushionClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>+</button>
      </div>

      {/* === UPHOLSTERY COLUMN === */}
      <div className="component-card">
        {upholstery.map((u, index) => (
          <div key={String(u._id)} className="component-section">
            <div className="card-header">
              <h4>Upholstery {index + 1}</h4>
              <Pencil className="edit-icon" onClick={() => onEditUpholsteryClick(u)} />
            </div>
            <p><strong>Type:</strong> {u.type}</p>
            <p><strong>Description:</strong> {u.description}</p>
            <p><strong>Ordered:</strong> {u.orderedDate ? String(u.orderedDate) : "—"}</p>
            <p><strong>Received:</strong> {u.receivedDate ? String(u.receivedDate) : "—"}</p>

          </div>
        ))}
        <button className="add-btn" onClick={() => onAddUpholsteryClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>+</button>
      </div>
    </div>
  );
}

export default SubJobTableRow;
