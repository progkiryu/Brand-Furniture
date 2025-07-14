import { useState } from "react";
import SubJobTableRow from "./SubJobTableRow";

interface SubJobTableProps {
    subJobsParam: SubJob[]; //
    onAddComponentClick: () => void;
    onAddFrameClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddCushionClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void; // New prop
}

function SubJobTable({subJobsParam, onAddComponentClick, onAddFrameClick, onAddCushionClick, onAddUpholsteryClick}: SubJobTableProps) {
    if (!subJobsParam || subJobsParam.length === 0) {
        return <div>
            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Frames</th>
                        <th>Cushions</th>
                        <th>Upholstery</th>
                    </tr>    
                </thead>
            </table>
            <input type="button" value="Add Component" onClick={onAddComponentClick}></input> 
        </div>
    }

    const [subJobs] = useState<SubJob[]>(subJobsParam);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Component</th>
                        <th>Frames</th>
                        <th>Cushions</th>
                        <th>Upholstery</th>
                    </tr>
                </thead>
                <tbody>
                {
                    subJobs.map((subJob: SubJob) => {
                        return (<SubJobTableRow key={String(subJob._id)}
                            subJobParam={subJob}
                            onAddFrameClick={onAddFrameClick} // Pass the new prop
                            onAddCushionClick={onAddCushionClick} // Pass the new prop
                            onAddUpholsteryClick={onAddUpholsteryClick} // Pass the new prop
                        />)
                    })
                }
                </tbody>
            </table>
            <input type="button" value="Add Component" onClick={onAddComponentClick}></input> 
        </div>
    )
}

export default SubJobTable;