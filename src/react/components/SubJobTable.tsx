import { useState } from "react";
import SubJobTableRow from "./SubJobTableRow";

interface SubJobTableProps {
    subJobsParam: SubJob[];
}

function SubJobTable({subJobsParam}: SubJobTableProps) {
    if (!subJobsParam || subJobsParam.length === 0) {
        return <h1>No sub-jobs!</h1>
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
        </div>
    )
}

export default SubJobTable;