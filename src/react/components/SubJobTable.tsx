// import { useState, useEffect } from "react";
// import SubJobTableRow from "./SubJobTableRow";

// interface SubJobTableProps {
//     subJobsParam: SubJob[]; //
//     onAddComponentClick: () => void;
//     onAddFrameClick: (subJobId: String, subJobDetail: String) => void; // New prop
//     onAddCushionClick: (subJobId: String, subJobDetail: String) => void; // New prop
//     onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void; // New prop
//     onEditSubJobClick: (subJob: SubJob) => void; // New prop for editing sub-job
//     onEditFrameClick: (frame: Frame) => void; // New prop for editing frame
//     onEditCushionClick: (cushion: Cushion) => void; // New prop for editing cushion
//     onEditUpholsteryClick: (upholstery: Upholstery) => void; // New prop for editing upholstery
// }

// function SubJobTable({
//     subJobsParam, 
//     onAddComponentClick, 
//     onAddFrameClick, 
//     onAddCushionClick, 
//     onAddUpholsteryClick,
//     onEditSubJobClick, // Destructure new prop
//     onEditFrameClick, // Destructure new prop
//     onEditCushionClick, // Destructure new prop
//     onEditUpholsteryClick // Destructure new prop
// }: SubJobTableProps) {
//     const [subJobs, setSubJobs] = useState<SubJob[]>(subJobsParam);

//     useEffect(() => {
//         setSubJobs(subJobsParam);
//     }, [subJobsParam

//     return (
//     <>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Component</th>
//                     <th>Frames</th>
//                     <th>Cushions</th>
//                     <th>Upholstery</th>
//                 </tr>
//             </thead>
//             <tbody>
//             {
//                 subJobs.map((subJob: SubJob) => {
//                     return (<SubJobTableRow key={String(subJob._id)}
//                         subJobParam={subJob}
//                         onAddFrameClick={onAddFrameClick} // Pass the new prop
//                         onAddCushionClick={onAddCushionClick} // Pass the new prop
//                         onAddUpholsteryClick={onAddUpholsteryClick} // Pass the new prop
//                         onEditSubJobClick={onEditSubJobClick} // Pass to SubJobTableRow
//                         onEditFrameClick={onEditFrameClick} // Pass to SubJobTableRow
//                         onEditCushionClick={onEditCushionClick} // Pass to SubJobTableRow
//                         onEditUpholsteryClick={onEditUpholsteryClick} // Pass to SubJobTableRow
//                     />)
//                 })
//             }
//             </tbody>
//         </table>
//         <input type="button" value="Add Component" onClick={onAddComponentClick}></input> 
//     </>
//     )
// }

// export default SubJobTable;

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
        <div>Sub-job</div>
        <div>Frames/Parts</div>
        <div>Cushion</div>
        <div>Upholstery</div>
      </div>

      {subJobs.map((subJob) => (
        <SubJobTableRow
          key={String(subJob._id)}
          subJobParam={subJob}
          onAddFrameClick={onAddFrameClick}
          onAddCushionClick={onAddCushionClick}
          onAddUpholsteryClick={onAddUpholsteryClick}
          onEditSubJobClick={onEditSubJobClick}
          onEditFrameClick={onEditFrameClick}
          onEditCushionClick={onEditCushionClick}
          onEditUpholsteryClick={onEditUpholsteryClick}
        />
      ))}

      <button className="add-component-btn" onClick={onAddComponentClick}>
        +
      </button>
    </div>
  );
}

export default SubJobTable;
