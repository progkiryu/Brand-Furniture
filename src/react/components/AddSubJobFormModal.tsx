
// AddSubJobFormModal.tsx
// import React, { useState } from 'react';
// import type { NewSubJobDataForAdd } from '../pages/Schedule'


// // Define NewFrameDataForAdd locally
// interface NewFrameDataForAdd {
//     subJobId: string;
//     supplier?: string;
//     description?: string;
//     orderedDate?: Date;
//     expectedDate?: Date;
//     receivedDate?: Date;
// }

// // Define NewCushionDataForAdd locally
// interface NewCushionDataForAdd {
//     subJobId: string;
//     type: string;
//     supplier?: string;
//     description?: string;
//     orderedDate?: Date;
//     expectedDate?: Date;
//     receivedDate?: Date;
// }

// // Define NewUpholsteryDataForAdd locally
// interface NewUpholsteryDataForAdd {
//     subJobId: string;
//     type: string;
//     supplier?: string;
//     description?: string;
//     orderedDate?: Date;
//     expectedDate?: Date;
//     receivedDate?: Date;
// }


// interface AddSubJobFormModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     jobId: string | null; // The _id of the parent Job (now passed as jobId for SubJob)
//     invoiceId: string | null; // The invoiceId of the parent Job (for display)
//     onAddSubJob: (jobId: string, newSubJobData: NewSubJobDataForAdd) => void; // Corrected prop type
// }

// function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
//     // State for Sub-Job Details (Detail Tab)
//     const [subJobDetail, setSubJobDetail] = useState<string>('');
//     const [note, setNote] = useState<string>('');
//     const [file, setFile] = useState<string>('');
//     const [subJobDueDate, setSubJobDueDate] = useState<string>(''); // For SubJob's dueDate

//     // State for Frame Details (Frame Tab)
//     const [frameSupplier, setFrameSupplier] = useState<string>('');
//     const [frameDescription, setFrameDescription] = useState<string>('');
//     const [frameOrderedDate, setFrameOrderedDate] = useState<string>('');
//     const [frameExpectedDate, setFrameExpectedDate] = useState<string>('');
//     const [frameReceivedDate, setFrameReceivedDate] = useState<string>('');

//     // State for Cushion Details (Cushion Tab)
//     const [cushionSupplier, setCushionSupplier] = useState<string>('');
//     const [cushionType, setCushionType] = useState<string>('');
//     const [cushionDescription, setCushionDescription] = useState<string>('');
//     const [cushionOrderedDate, setCushionOrderedDate] = useState<string>('');
//     const [cushionExpectedDate, setCushionExpectedDate] = useState<string>('');
//     const [cushionReceivedDate, setCushionReceivedDate] = useState<string>('');

//     // State for Upholstery Details (Upholstery Tab)
//     const [upholsterySupplier, setUpholsterySupplier] = useState<string>('');
//     const [upholsteryType, setUpholsteryType] = useState<string>('');
//     const [upholsteryDescription, setUpholsteryDescription] = useState<string>('');
//     const [upholsteryOrderedDate, setUpholsteryOrderedDate] = useState<string>('');
//     const [upholsteryExpectedDate, setUpholsteryExpectedDate] = useState<string>('');
//     const [upholsteryReceivedDate, setUpholsteryReceivedDate] = useState<string>('');

   


//     // State to manage the active tab
//     const [activeTab, setActiveTab] = useState<'detail' | 'frame' | 'cushion' | 'upholstery' >('detail');

//     if (!isOpen || !jobId || invoiceId === null) return null; // Ensure modal only renders if open and necessary IDs are provided

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();

//         // The "Add Sub-Job" button will always submit the data from the "Detail" tab
//         // as this is the core information required to create a new SubJob.
//         // Other tabs' data would typically be added/updated in separate operations
//         // after the SubJob is initially created.

//         // Basic validation for sub-job detail (the minimum required field)
//         if (!subJobDetail) {
//             alert('Please fill in the Sub-Job Detail field on the Detail tab.');
//             setActiveTab('detail'); // Switch back to detail tab if validation fails
//             return;
//         }

//         // Construct the new sub-job data using only the 'Detail' tab's state
//         const newSubJobData: NewSubJobDataForAdd = {
//             jobId: jobId, // Pass the parent Job's _id as jobId for the new SubJob
//             subJobDetail: subJobDetail,
//             note: note,
//             file: file,
//             dueDate: subJobDueDate ? new Date(subJobDueDate) : undefined, // Convert to Date object or undefined
//         };

//         // Call the parent handler, passing the jobId and the new sub-job data
//         // The parent (Schedule.tsx) will then handle inserting this new SubJob
//         // and updating the parent Job's subJobList.
//         onAddSubJob(jobId, newSubJobData);
//         onClose(); // Close the modal after submission

//         // Reset all form fields across all tabs
//         setSubJobDetail('');
//         setNote('');
//         setFile('');
//         setSubJobDueDate('');

//         setFrameSupplier('');
//         setFrameDescription('');
//         setFrameOrderedDate('');
//         setFrameExpectedDate('');
//         setFrameReceivedDate('');

//         setCushionSupplier('');
//         setCushionType('');
//         setCushionDescription('');
//         setCushionOrderedDate('');
//         setCushionExpectedDate('');
//         setCushionReceivedDate('');

//         setUpholsterySupplier('');
//         setUpholsteryType('');
//         setUpholsteryDescription('');
//         setUpholsteryOrderedDate('');
//         setUpholsteryExpectedDate('');
//         setUpholsteryReceivedDate('');

//         setActiveTab('detail'); // Reset to detail tab after submission
//     };

//     return (
//         <div className="sub-job-modal-overlay" onClick={onClose}>
//             <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button onClick={onClose} className="sub-job-modal-close-btn">&times;</button>
//                 <form onSubmit={handleSubmit} className="sub-job-modal-form">
//                     <h2>Job Component for Invoice #{invoiceId}</h2>

//                     {/* Tab Navigation */}
//                     <div className="tab-navigation">
//                         <button
//                             type="button" // Important: Prevent form submission when clicking a tab
//                             className={activeTab === 'detail' ? 'active' : ''}
//                             onClick={() => setActiveTab('detail')}
//                         >
//                             Detail
//                         </button>
//                         <button
//                             type="button"
//                             className={activeTab === 'frame' ? 'active' : ''}
//                             onClick={() => setActiveTab('frame')}
//                         >
//                             Frame
//                         </button>
//                         <button
//                             type="button"
//                             className={activeTab === 'cushion' ? 'active' : ''}
//                             onClick={() => setActiveTab('cushion')}
//                         >
//                             Cushion
//                         </button>
//                         <button
//                             type="button"
//                             className={activeTab === 'upholstery' ? 'active' : ''}
//                             onClick={() => setActiveTab('upholstery')}
//                         >
//                             Upholstery
//                         </button>
//                     </div>

//                     {/* Tab Content - Conditional Rendering */}
//                     <div className="tab-content">
//                         {activeTab === 'detail' && (
//                             <div className="detail-section">
//                                 {/* Existing fields for Sub-Job details */}
//                                 <div className="form-group">
//                                     <label htmlFor="subJobDetail">Sub-Job Detail:</label>
//                                     <textarea
//                                         id="subJobDetail"
//                                         value={subJobDetail}
//                                         onChange={(e) => setSubJobDetail(e.target.value)}
//                                         rows={4}
//                                         required
//                                     ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="note">Note:</label>
//                                     <textarea
//                                         id="note"
//                                         value={note}
//                                         onChange={(e) => setNote(e.target.value)}
//                                         rows={2}
//                                     ></textarea>
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="file">File:</label>
//                                     <input
//                                         type="text"
//                                         id="file"
//                                         value={file}
//                                         onChange={(e) => setFile(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="subJobDueDate">Due Date:</label> {/* Added for SubJob */}
//                                     <input
//                                         type="date"
//                                         id="subJobDueDate"
//                                         value={subJobDueDate}
//                                         onChange={(e) => setSubJobDueDate(e.target.value)}
//                                     />
//                                 </div>

//                             </div>
//                         )}

//                         {activeTab === 'frame' && (
//                             <>
//                             <div className="frame-section">
//                                 <div className="form-group">
//                                     <label htmlFor="frameSupplier">Supplier:</label>
//                                     <input type="text" id="frameSupplier" value={frameSupplier} onChange={(e) => setFrameSupplier(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="frameDescription">Description:</label>
//                                     <input type="text" id="frameDescription" value={frameDescription} onChange={(e) => setFrameDescription(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="frameOrderedDate">Ordered Date:</label>
//                                     <input type="date" id="frameOrderedDate" value={frameOrderedDate} onChange={(e) => setFrameOrderedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="frameExpectedDate">Expected Date:</label>
//                                     <input type="date" id="frameExpectedDate" value={frameExpectedDate} onChange={(e) => setFrameExpectedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="frameReceivedDate">Received Date:</label>
//                                     <input type="date" id="frameReceivedDate" value={frameReceivedDate} onChange={(e) => setFrameReceivedDate(e.target.value)} />
//                                 </div>
                        
//                             </div>
//                             <div className="add-btn-container">
//                                 <input className="add-btn"
//                                     type="button"
//                                     value="+"
                                    
//                                 />
//                             </div>
//                             </>
//                         )}

//                         {activeTab === 'cushion' && (
//                             <>
//                             <div className="cushion-section">
//                                 <div className="form-group">
//                                     <label htmlFor="cushionSupplier">Supplier:</label>
//                                     <input type="text" id="cushionSupplier" value={cushionSupplier} onChange={(e) => setCushionSupplier(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="cushionType">Type:</label>
//                                     <input type="text" id="cushionType" value={cushionType} onChange={(e) => setCushionType(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="cushionDescription">Description:</label>
//                                     <input type="text" id="cushionDescription" value={cushionDescription} onChange={(e) => setCushionDescription(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="cushionOrderedDate">Ordered Date:</label>
//                                     <input type="date" id="cushionOrderedDate" value={cushionOrderedDate} onChange={(e) => setCushionOrderedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="cushionExpectedDate">Expected Date:</label>
//                                     <input type="date" id="cushionExpectedDate" value={cushionExpectedDate} onChange={(e) => setCushionExpectedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="cushionReceivedDate">Received Date:</label>
//                                     <input type="date" id="cushionReceivedDate" value={cushionReceivedDate} onChange={(e) => setCushionReceivedDate(e.target.value)} />
//                                 </div>
//                             </div>
//                             <div className="add-btn-container">
//                                 <input className="add-btn"
//                                     type="button"
//                                     value="+"
                                    
//                                 />
//                             </div>
//                             </>
//                         )}

//                         {activeTab === 'upholstery' && (
//                             <>
//                             <div className="upholstery-section">
//                                 <div className="form-group">
//                                     <label htmlFor="upholsterySupplier">Supplier:</label>
//                                     <input type="text" id="upholsterySupplier" value={upholsterySupplier} onChange={(e) => setUpholsterySupplier(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="upholsteryType">Type:</label>
//                                     <input type="text" id="upholsteryType" value={upholsteryType} onChange={(e) => setUpholsteryType(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="upholsteryDescription">Description:</label>
//                                     <input type="text" id="upholsteryDescription" value={upholsteryDescription} onChange={(e) => setUpholsteryDescription(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="upholsteryOrderedDate">Ordered Date:</label>
//                                     <input type="date" id="upholsteryOrderedDate" value={upholsteryOrderedDate} onChange={(e) => setUpholsteryOrderedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="upholsteryExpectedDate">Expected Date:</label>
//                                     <input type="date" id="upholsteryExpectedDate" value={upholsteryExpectedDate} onChange={(e) => setUpholsteryExpectedDate(e.target.value)} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="upholsteryReceivedDate">Received Date:</label>
//                                     <input type="date" id="upholsteryReceivedDate" value={upholsteryReceivedDate} onChange={(e) => setUpholsteryReceivedDate(e.target.value)} />
//                                 </div>
//                             </div>
//                             <div className="add-btn-container">
//                                 <input className="add-btn"
//                                     type="button"
//                                     value="+"
                                    
//                                 />
//                             </div>
//                             </>
//                         )}

//                     </div>

//                     <button type="submit">Add Component</button> {/* This button will submit the currently active tab's data (or all if combined) */}
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddSubJobFormModal;


// AddSubJobFormModal.tsx
import React, { useState, useEffect } from 'react';

// --- Default Data Types from types.d.ts (simulated here for clarity) ---
// In a real project, these would be imported:
// import { type SubJob, type Frame, type Cushion, type Upholstery } from './types.d.ts';

// Using 'string' for String and 'Date' for Date as per standard TypeScript
export type FrameType = { // Renamed to FrameType to avoid conflict with local interface usage
    _id?: string;
    subJobId?: string; // Optional for creation, assigned by backend
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
};

export type CushionType = { // Renamed to CushionType
    _id?: string;
    subJobId?: string; // Optional for creation, assigned by backend
    type: string; // Note: 'type' is a required field here
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
};

export type UpholsteryType = { // Renamed to UpholsteryType
    _id?: string;
    subJobId?: string; // Optional for creation, assigned by backend
    type: string; // Note: 'type' is a required field here
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
};

// This type represents the data collected by the modal for a NEW SubJob and its components.
// It will be passed to onAddSubJob.
export interface NewSubJobDataForAddWithComponents {
    jobId: string; // The parent Job's _id
    subJobDetail: string;
    note?: string;
    file?: string;
    dueDate?: Date;
    // These will contain the full details of the new components,
    // which the parent function will then save and link by ID.
    frames?: FrameType[];
    cushions?: CushionType[];
    upholstery?: UpholsteryType[];
}

// --- Props Interface ---
interface AddSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string | null;
    invoiceId: string | null;
    onAddSubJob: (jobId: string, newSubJobData: NewSubJobDataForAddWithComponents) => void;
}

function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
    // --- State for Sub-Job Details (Detail Tab) ---
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [subJobDueDate, setSubJobDueDate] = useState<string>('');

    // --- State for Component Details (now arrays) ---
    // Use the imported types for state management
    const [frames, setFrames] = useState<FrameType[]>([]);
    const [cushions, setCushions] = useState<CushionType[]>([]);
    const [upholstery, setUpholstery] = useState<UpholsteryType[]>([]);

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState<'detail' | 'frame' | 'cushion' | 'upholstery'>('detail');

    // --- Helper for Date Formatting (for input type="date") ---
    const formatDateForInput = (dateValue: Date | string | null | undefined): string => {
        if (!dateValue) return '';
        let date: Date;
        if (dateValue instanceof Date) {
            date = dateValue;
        } else if (typeof dateValue === 'string') {
            date = new Date(dateValue);
        } else {
            return '';
        }
        return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
    };

    // --- Validation Helper for Components ---
    // Check if at least one non-date, non-_id, non-subJobId field is filled
    const hasNonDateAndRequiredFieldsFilled = (item: FrameType | CushionType | UpholsteryType): boolean => {
        // Exclude _id, subJobId, and date fields from the check
        const { _id, subJobId, orderedDate, expectedDate, receivedDate, ...rest } = item;

        // Special handling for Cushion/Upholstery 'type' field as it's required
        if ('type' in rest && typeof rest.type === 'string' && rest.type.trim() !== '') {
            return true;
        }

        // Check other fields
        return Object.values(rest).some(val => val !== undefined && val !== null && String(val).trim() !== '');
    };


    // --- Handlers for Adding New Component Entries ---
    const handleAddFrame = () => {
        // Validate the last frame's non-date fields before adding a new one
        if (frames.length === 0 || hasNonDateAndRequiredFieldsFilled(frames[frames.length - 1])) {
            setFrames(prev => [...prev, {} as FrameType]); // Add an empty frame object
        } else {
            alert('Please fill at least one field (excluding dates) for the current frame before adding a new one.');
        }
    };

    const handleAddCushion = () => {
        // Validate the last cushion's non-date fields before adding a new one
        // Note: Cushion 'type' is required, so it must be filled for a valid cushion entry.
        if (cushions.length === 0 || hasNonDateAndRequiredFieldsFilled(cushions[cushions.length - 1])) {
            setCushions(prev => [...prev, { type: '' } as CushionType]); // Add an empty cushion object, with type initialized
        } else {
            alert('Please fill at least the "Type" field for the current cushion before adding a new one.');
        }
    };

    const handleAddUpholstery = () => {
        // Validate the last upholstery's non-date fields before adding a new one
        // Note: Upholstery 'type' is required, so it must be filled for a valid upholstery entry.
        if (upholstery.length === 0 || hasNonDateAndRequiredFieldsFilled(upholstery[upholstery.length - 1])) {
            setUpholstery(prev => [...prev, { type: '' } as UpholsteryType]); // Add an empty upholstery object, with type initialized
        } else {
            alert('Please fill at least the "Type" field for the current upholstery before adding a new one.');
        }
    };

    // --- Handlers for Changing Existing Component Entries ---
    // 'field' type adjusted to be 'keyof Omit<FrameType, "_id" | "subJobId">' as _id and subJobId are not user input
    const handleFrameChange = (index: number, field: keyof Omit<FrameType, "_id" | "subJobId">, value: string) => {
        setFrames(prev => prev.map((frame, i) => {
            if (i === index) {
                if (field === 'orderedDate' || field === 'expectedDate' || field === 'receivedDate') {
                    // Dates are stored as Date objects in state
                    return { ...frame, [field]: value ? new Date(value) : null };
                }
                return { ...frame, [field]: value };
            }
            return frame;
        }));
    };

    const handleCushionChange = (index: number, field: keyof Omit<CushionType, "_id" | "subJobId">, value: string) => {
        setCushions(prev => prev.map((cushion, i) => {
            if (i === index) {
                if (field === 'orderedDate' || field === 'expectedDate' || field === 'receivedDate') {
                    return { ...cushion, [field]: value ? new Date(value) : null };
                }
                return { ...cushion, [field]: value };
            }
            return cushion;
        }));
    };

    const handleUpholsteryChange = (index: number, field: keyof Omit<UpholsteryType, "_id" | "subJobId">, value: string) => {
        setUpholstery(prev => prev.map((upholsteryItem, i) => {
            if (i === index) {
                if (field === 'orderedDate' || field === 'expectedDate' || field === 'receivedDate') {
                    return { ...upholsteryItem, [field]: value ? new Date(value) : null };
                }
                return { ...upholsteryItem, [field]: value };
            }
            return upholsteryItem;
        }));
    };

    // --- Effect for Initial Component and Reset on Close ---
    useEffect(() => {
        if (!isOpen) { // Reset all state when modal closes
            setSubJobDetail('');
            setNote('');
            setFile('');
            setSubJobDueDate('');
            setFrames([]);
            setCushions([]);
            setUpholstery([]);
            setActiveTab('detail');
        } else {
            // When modal opens and tab is selected, if no components exist, add one empty
            if (activeTab === 'frame' && frames.length === 0) {
                setFrames([{} as FrameType]);
            }
            // For Cushion and Upholstery, 'type' is required, so initialize it.
            if (activeTab === 'cushion' && cushions.length === 0) {
                setCushions([{ type: '' } as CushionType]);
            }
            if (activeTab === 'upholstery' && upholstery.length === 0) {
                setUpholstery([{ type: '' } as UpholsteryType]);
            }
        }
    }, [isOpen, activeTab]); // Only depend on isOpen and activeTab for this logic

    // --- Early Exit if Modal Not Open or Missing Required IDs ---
    if (!isOpen || !jobId || invoiceId === null) return null;

    // --- Handle Form Submission ---
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation for sub-job detail (the minimum required field)
        if (!subJobDetail) {
            alert('Please fill in the Sub-Job Detail field on the Detail tab.');
            setActiveTab('detail');
            return;
        }

        // --- Validate the last entry in each tab before submission (only if there are entries) ---
        if (activeTab === 'frame' && frames.length > 0 && !hasNonDateAndRequiredFieldsFilled(frames[frames.length - 1])) {
            alert('Please fill at least one field (excluding dates) for the current frame before submitting.');
            return;
        }
        if (activeTab === 'cushion' && cushions.length > 0 && !hasNonDateAndRequiredFieldsFilled(cushions[cushions.length - 1])) {
            alert('Please fill at least the "Type" field for the current cushion before submitting.');
            return;
        }
        if (activeTab === 'upholstery' && upholstery.length > 0 && !hasNonDateAndRequiredFieldsFilled(upholstery[upholstery.length - 1])) {
            alert('Please fill at least the "Type" field for the current upholstery before submitting.');
            return;
        }


        // Construct the new sub-job data including all component arrays
        const newSubJobData: NewSubJobDataForAddWithComponents = {
            jobId: jobId,
            subJobDetail: subJobDetail,
            note: note || undefined,
            file: file || undefined,
            dueDate: subJobDueDate ? new Date(subJobDueDate) : undefined,
            // Filter out truly empty components before sending
            frames: frames.length > 0 ? frames.filter(hasNonDateAndRequiredFieldsFilled) : undefined,
            cushions: cushions.length > 0 ? cushions.filter(hasNonDateAndRequiredFieldsFilled) : undefined,
            upholstery: upholstery.length > 0 ? upholstery.filter(hasNonDateAndRequiredFieldsFilled) : undefined,
        };

        // Important: Frontend does not assign _id or subJobId for NEW components.
        // These are handled by the backend after insertion.
        // We ensure they are not part of the data sent from the modal for creation.
        newSubJobData.frames?.forEach(f => { delete f._id; delete f.subJobId; });
        newSubJobData.cushions?.forEach(c => { delete c._id; delete c.subJobId; });
        newSubJobData.upholstery?.forEach(u => { delete u._id; delete u.subJobId; });


        onAddSubJob(jobId, newSubJobData); // Pass the comprehensive data
        onClose(); // Close the modal after submission
    };

    return (
        <div className="sub-job-modal-overlay" onClick={onClose}>
            <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="sub-job-modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="sub-job-modal-form">
                    <h2>Job Component for Invoice #{invoiceId}</h2>

                    {/* Tab Navigation */}
                    <div className="tab-navigation">
                        <button
                            type="button"
                            className={activeTab === 'detail' ? 'active' : ''}
                            onClick={() => setActiveTab('detail')}
                        >
                            Detail
                        </button>
                        <button
                            type="button"
                            className={activeTab === 'frame' ? 'active' : ''}
                            onClick={() => setActiveTab('frame')}
                        >
                            Frame
                        </button>
                        <button
                            type="button"
                            className={activeTab === 'cushion' ? 'active' : ''}
                            onClick={() => setActiveTab('cushion')}
                        >
                            Cushion
                        </button>
                        <button
                            type="button"
                            className={activeTab === 'upholstery' ? 'active' : ''}
                            onClick={() => setActiveTab('upholstery')}
                        >
                            Upholstery
                        </button>
                    </div>

                    {/* Tab Content - Conditional Rendering */}
                    <div className="tab-content">
                        {activeTab === 'detail' && (
                            <div className="detail-section">
                                <div className="form-group">
                                    <label htmlFor="subJobDetail">Sub-Job Detail:</label>
                                    <textarea
                                        id="subJobDetail"
                                        value={subJobDetail}
                                        onChange={(e) => setSubJobDetail(e.target.value)}
                                        rows={4}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note">Note:</label>
                                    <textarea
                                        id="note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        rows={2}
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="file">File:</label>
                                    <input
                                        type="text"
                                        id="file"
                                        value={file}
                                        onChange={(e) => setFile(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subJobDueDate">Due Date:</label>
                                    <input
                                        type="date"
                                        id="subJobDueDate"
                                        value={subJobDueDate}
                                        onChange={(e) => setSubJobDueDate(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === 'frame' && (
                            <>
                                <h3 className="tab-section-title">Frame Details</h3>
                                {frames.map((frame, index) => (
                                    <div key={index} className="component-item">
                                        <h4>Frame {index + 1}</h4>
                                        <div className="form-group">
                                            <label htmlFor={`frameSupplier-${index}`}>Supplier:</label>
                                            <input
                                                type="text"
                                                id={`frameSupplier-${index}`}
                                                value={frame.supplier || ''}
                                                onChange={(e) => handleFrameChange(index, 'supplier', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`frameDescription-${index}`}>Description:</label>
                                            <input
                                                type="text"
                                                id={`frameDescription-${index}`}
                                                value={frame.description || ''}
                                                onChange={(e) => handleFrameChange(index, 'description', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`frameOrderedDate-${index}`}>Ordered Date:</label>
                                            <input
                                                type="date"
                                                id={`frameOrderedDate-${index}`}
                                                value={formatDateForInput(frame.orderedDate)}
                                                onChange={(e) => handleFrameChange(index, 'orderedDate', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`frameExpectedDate-${index}`}>Expected Date:</label>
                                            <input
                                                type="date"
                                                id={`frameExpectedDate-${index}`}
                                                value={formatDateForInput(frame.expectedDate)}
                                                onChange={(e) => handleFrameChange(index, 'expectedDate', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`frameReceivedDate-${index}`}>Received Date:</label>
                                            <input
                                                type="date"
                                                id={`frameReceivedDate-${index}`}
                                                value={formatDateForInput(frame.receivedDate)}
                                                onChange={(e) => handleFrameChange(index, 'receivedDate', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="add-btn-container">
                                    <input
                                        className="add-btn"
                                        type="button"
                                        value="+"
                                        onClick={handleAddFrame}
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'cushion' && (
                            <>
                                <h3 className="tab-section-title">Cushion Details</h3>
                                {cushions.map((cushion, index) => (
                                    <div key={index} className="component-item">
                                        <h4>Cushion {index + 1}</h4>
                                        <div className="form-group">
                                            <label htmlFor={`cushionType-${index}`}>Type: *</label> {/* Added required indicator */}
                                            <input
                                                type="text"
                                                id={`cushionType-${index}`}
                                                value={cushion.type || ''}
                                                onChange={(e) => handleCushionChange(index, 'type', e.target.value)}
                                                required // 'type' is required per your definition
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`cushionSupplier-${index}`}>Supplier:</label>
                                            <input type="text" id={`cushionSupplier-${index}`} value={cushion.supplier || ''} onChange={(e) => handleCushionChange(index, 'supplier', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`cushionDescription-${index}`}>Description:</label>
                                            <input type="text" id={`cushionDescription-${index}`} value={cushion.description || ''} onChange={(e) => handleCushionChange(index, 'description', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`cushionOrderedDate-${index}`}>Ordered Date:</label>
                                            <input type="date" id={`cushionOrderedDate-${index}`} value={formatDateForInput(cushion.orderedDate)} onChange={(e) => handleCushionChange(index, 'orderedDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`cushionExpectedDate-${index}`}>Expected Date:</label>
                                            <input type="date" id={`cushionExpectedDate-${index}`} value={formatDateForInput(cushion.expectedDate)} onChange={(e) => handleCushionChange(index, 'expectedDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`cushionReceivedDate-${index}`}>Received Date:</label>
                                            <input type="date" id={`cushionReceivedDate-${index}`} value={formatDateForInput(cushion.receivedDate)} onChange={(e) => handleCushionChange(index, 'receivedDate', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                                <div className="add-btn-container">
                                    <input
                                        className="add-btn"
                                        type="button"
                                        value="+"
                                        onClick={handleAddCushion}
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'upholstery' && (
                            <>
                                <h3 className="tab-section-title">Upholstery Details</h3>
                                {upholstery.map((upholsteryItem, index) => (
                                    <div key={index} className="component-item">
                                        <h4>Upholstery {index + 1}</h4>
                                        <div className="form-group">
                                            <label htmlFor={`upholsteryType-${index}`}>Type: *</label> {/* Added required indicator */}
                                            <input
                                                type="text"
                                                id={`upholsteryType-${index}`}
                                                value={upholsteryItem.type || ''}
                                                onChange={(e) => handleUpholsteryChange(index, 'type', e.target.value)}
                                                required // 'type' is required per your definition
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`upholsterySupplier-${index}`}>Supplier:</label>
                                            <input type="text" id={`upholsterySupplier-${index}`} value={upholsteryItem.supplier || ''} onChange={(e) => handleUpholsteryChange(index, 'supplier', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`upholsteryDescription-${index}`}>Description:</label>
                                            <input type="text" id={`upholsteryDescription-${index}`} value={upholsteryItem.description || ''} onChange={(e) => handleUpholsteryChange(index, 'description', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`upholsteryOrderedDate-${index}`}>Ordered Date:</label>
                                            <input type="date" id={`upholsteryOrderedDate-${index}`} value={formatDateForInput(upholsteryItem.orderedDate)} onChange={(e) => handleUpholsteryChange(index, 'orderedDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`upholsteryExpectedDate-${index}`}>Expected Date:</label>
                                            <input type="date" id={`upholsteryExpectedDate-${index}`} value={formatDateForInput(upholsteryItem.expectedDate)} onChange={(e) => handleUpholsteryChange(index, 'expectedDate', e.target.value)} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`upholsteryReceivedDate-${index}`}>Received Date:</label>
                                            <input type="date" id={`upholsteryReceivedDate-${index}`} value={formatDateForInput(upholsteryItem.receivedDate)} onChange={(e) => handleUpholsteryChange(index, 'receivedDate', e.target.value)} />
                                        </div>
                                    </div>
                                ))}
                                <div className="add-btn-container">
                                    <input
                                        className="add-btn"
                                        type="button"
                                        value="+"
                                        onClick={handleAddUpholstery}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <button type="submit">Add Component</button>
                </form>
            </div>
        </div>
    );
}

export default AddSubJobFormModal;