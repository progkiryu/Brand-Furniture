import { useState } from "react";
import SubJobTableRow from "./SubJobTableRow";

interface SubJobTableProps {
    subJobsParam: SubJob[];
}

function SubJobTable({subJobsParam}: SubJobTableProps) {
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
            <input type="button" value="Add Component"></input>
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
                        />)
                    })
                }
                </tbody>
            </table>
            <input type="button" value="Add Component"></input>
        </div>
    )
}

export default SubJobTable;