import { useState, useEffect } from "react";
import SubJobTableRow from "./SubJobTableRow";

interface SubJobTableProps {
  subJobsParam: SubJob[];
  onAddComponentClick: () => void;
  onAddFrameClick: (subJobId: String, subJobDetail: String) => void;
  onAddCushionClick: (subJobId: String, subJobDetail: String) => void;
  onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void;
  onEditSubJobClick: (subJob: SubJob) => void;
  onEditFrameClick: (frame: Frame) => void;
  onEditCushionClick: (cushion: Cushion) => void;
  onEditUpholsteryClick: (upholstery: Upholstery) => void;
}

function SubJobTable({
  subJobsParam,
  onAddComponentClick,
  onAddFrameClick,
  onAddCushionClick,
  onAddUpholsteryClick,
  onEditSubJobClick,
  onEditFrameClick,
  onEditCushionClick,
  onEditUpholsteryClick,
}: SubJobTableProps) {
  const [subJobs, setSubJobs] = useState<SubJob[]>(subJobsParam);

  useEffect(() => {
    setSubJobs(subJobsParam);
  }, [subJobsParam]);

  return (
    <div className="job-components-wrapper">
      <div className="job-components-header">
        <div>Details</div>
        <div>Frames/Parts</div>
        <div>Cushion</div>
        <div>Upholstery</div>
      </div>

      <div className="job-components-body">
        {subJobs.map((subJob, index) => (
          <SubJobTableRow
            key={String(subJob._id)}
            subJobParam={subJob}
            index={index}
            onAddFrameClick={onAddFrameClick}
            onAddCushionClick={onAddCushionClick}
            onAddUpholsteryClick={onAddUpholsteryClick}
            onEditSubJobClick={onEditSubJobClick}
            onEditFrameClick={onEditFrameClick}
            onEditCushionClick={onEditCushionClick}
            onEditUpholsteryClick={onEditUpholsteryClick}
          />
        ))}
      </div>

      <button className="add-component-btn" onClick={onAddComponentClick}>
        +
      </button>
    </div>
  );
}

export default SubJobTable;
