import { useState, useEffect } from "react";
import SubJobTableRow from "./SubJobTableRow";

interface SubJobTableProps {
    subJobsParam: SubJob[]; //
    onAddComponentClick: () => void;
    onAddFrameClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddCushionClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void; // New prop
}

function SubJobTable({subJobsParam, onAddComponentClick, onAddFrameClick, onAddCushionClick, onAddUpholsteryClick}: SubJobTableProps) {
    const [subJobs, setSubJobs] = useState<SubJob[]>(subJobsParam);

    useEffect(() => {
        setSubJobs(subJobsParam);
    }, [subJobsParam])

    return (
    <>
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
    </>
    )
}

export default SubJobTable;