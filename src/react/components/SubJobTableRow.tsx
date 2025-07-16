import { useState, useEffect } from "react";

import { getFrameById } from "../api/frameAPI";
import { getCushionById } from "../api/cushionAPI";
import { getUpholsteryById } from "../api/upholsteryAPI";

interface SubJobTableRowProps {
    subJobParam: SubJob;
    onAddFrameClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddCushionClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onAddUpholsteryClick: (subJobId: String, subJobDetail: String) => void; // New prop
    onEditSubJobClick: (subJob: SubJob) => void; // New prop for editing sub-job
    onEditFrameClick: (frame: Frame) => void; // New prop for editing frame
    onEditCushionClick: (cushion: Cushion) => void; // New prop for editing cushion
    onEditUpholsteryClick: (upholstery: Upholstery) => void; // New prop for editing upholstery
}

function SubJobTableRow({
    subJobParam,
    onAddFrameClick,
    onAddCushionClick,
    onAddUpholsteryClick,
    onEditSubJobClick, // Destructure new props
    onEditFrameClick, // Destructure new props
    onEditCushionClick, // Destructure new props
    onEditUpholsteryClick // Destructure new props
}: SubJobTableRowProps) {

    const [frames, setFrames] = useState<Frame[]>([]);
    const [cushions, setCushions] = useState<Cushion[]>([]);
    const [upholstery, setUpholstery] = useState<Upholstery[]>([]);

    useEffect(() => {
        const fetchComponents = async () => {
            // Fetch Upholstery list
            // Ensure subJobParam.upholsteryList is treated as an array, even if null/undefined
            // Map each ID to a promise that fetches the item, then filter out any null/undefined results
            const fetchedUpholsteryPromises = (subJobParam.upholsteryList || []).map((upholsteryId: String) => {
                return getUpholsteryById(upholsteryId);
            });
            const fetchedUpholstery: Upholstery[] = (await Promise.all(fetchedUpholsteryPromises)).filter(Boolean) as Upholstery[];
            setUpholstery(fetchedUpholstery);

            // Fetch Frames list
            // Apply the same logic as above for frames
            const fetchedFramesPromises = (subJobParam.frameList || []).map((frameId: String) => {
                return getFrameById(frameId);
            });
            const fetchedFrames: Frame[] = (await Promise.all(fetchedFramesPromises)).filter(Boolean) as Frame[];
            setFrames(fetchedFrames);

            // Fetch Cushions list
            // Apply the same logic as above for cushions
            const fetchedCushionsPromises = (subJobParam.cushionList || []).map((cushionId: String) => {
                return getCushionById(cushionId);
            });
            const fetchedCushions: Cushion[] = (await Promise.all(fetchedCushionsPromises)).filter(Boolean) as Cushion[];
            setCushions(fetchedCushions);
        }
        fetchComponents();
    }, [subJobParam.upholsteryList, subJobParam.frameList, subJobParam.cushionList, subJobParam._id]); // Dependencies ensure this effect re-runs when lists or subJob ID changes

    


    return (
        <tr key={String(subJobParam._id)}>
            <td onClick={() => onEditSubJobClick(subJobParam)}>
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
                            <div key={String(frame._id)} onClick={() => onEditFrameClick(frame)}> {/* Add onClick handler */}
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
                <button onClick={() => onAddFrameClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>Add New Frame</button> {/* Add onClick handler */}
            </td>
            <td>
                {
                    cushions.map((cushion: Cushion) => {
                        return (
                            <div key={String(cushion._id)} onClick={() => onEditCushionClick(cushion)}> {/* Add onClick handler */}
                                <h2>{cushion.description}</h2>
                                <h2>Ordered:</h2>
                                <p>{String(cushion.orderedDate)}</p>
                                <h2>Received:</h2>
                                <p>{String(cushion.receivedDate)}</p>
                            </div>
                        )
                    })
                }
                <button onClick={() => onAddCushionClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>Add New Cushion</button> {/* Add onClick handler */}
            </td>
            <td>
                {
                    upholstery.map((upholster: Upholstery) => {
                        return (
                            <div key={String(upholster._id)} onClick={() => onEditUpholsteryClick(upholster)}> {/* Add onClick handler */}
                                <h2>{upholster.description}</h2>
                                <h2>Ordered:</h2>
                                <p>{String(upholster.orderedDate)}</p>
                                <h2>Received:</h2>
                                <p>{String(upholster.receivedDate)}</p>
                            </div>
                        )
                    })
                }
                <button onClick={() => onAddUpholsteryClick(subJobParam._id as String, subJobParam.subJobDetail as String)}>Add New Upholstery</button> {/* Add onClick handler */}
            </td>
        </tr>)
}

export default SubJobTableRow;