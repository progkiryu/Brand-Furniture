import { useState, useEffect } from "react"; 

import { getFrameById } from "../api/frameAPI";
import { getCushionById } from "../api/cushionAPI";
import { getUpholsteryById } from "../api/upholsteryAPI";

interface SubJobTableRowProps {
    subJobParam: SubJob;
}

function SubJobTableRow({
    subJobParam
}: SubJobTableRowProps) {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [cushions, setCushions] = useState<Cushion[]>([]);
    const [upholstery, setUpholstery] = useState<Upholstery[]>([]);

    useEffect(() => {
        const fetchComponents = async () => {
            if (subJobParam.upholsteryList && subJobParam.upholsteryList.length > 0) {
                const awaitUpholstery = subJobParam.upholsteryList.map((upholsteryId: String) => {
                    return getUpholsteryById(upholsteryId);
                })
                const fetchedUpholstery: Upholstery[] = await Promise.all(awaitUpholstery);
                setUpholstery(fetchedUpholstery);
            }
        }
        fetchComponents();
    }, []);


    return <tr key={String(subJobParam._id)}>
        <td>
            <div>
                <h2>Job</h2>
                <p>{subJobParam.subJobDetail}</p>
            </div>
            <div>
                <h2>Notes</h2>
                <p>{subJobParam.note}</p>
            </div>
            <div>
                <h2>Files</h2>
                <p>{subJobParam.file}</p>
            </div>
        </td>
        <td>
        {
            frames.map((frame: Frame) => {
                return (
                    <div key={String(frame._id)}>
                        <h2>Supplier:</h2>
                        <p>{frame.supplier}</p>
                        <h2>Ordered:</h2>
                        <p>{String(frame.orderedDate)}</p>
                        <h2>Received:</h2>
                        <h2>{String(frame.receivedDate)}</h2>
                    </div>
                )
            })
        }
            <button>Add New Frame</button>
        </td>
        <td>
        {
            cushions.map((cushion: Cushion) => {
                return (
                    <div key={String(cushion._id)}>
                        <h2>{cushion.description}</h2>
                        <h2>Ordered:</h2>
                        <p>{String(cushion.orderedDate)}</p>
                        <h2>Received:</h2>
                        <p>{String(cushion.receivedDate)}</p>
                    </div>
                )
            })
        }
            <button>Add New Cushion</button>
        </td>
        <td>
        {
            upholstery.map((upholster: Upholstery) => {
                return (
                    <div key={String(upholster._id)}>
                        <h2>{upholster.description}</h2>
                        <h2>Ordered:</h2>
                        <p>{String(upholster.orderedDate)}</p>
                        <h2>Received:</h2>
                        <p>{String(upholster.receivedDate)}</p>
                    </div>
                )
            })
        }
            <button>Add New Upholster</button>
        </td>
    </tr>
}

export default SubJobTableRow;