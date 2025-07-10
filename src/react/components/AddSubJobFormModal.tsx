// // // AddSubJobFormModal.tsx
// import React, { useState } from 'react';


// interface AddSubJobFormModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     jobId: string | null; // The jobId of the parent Job
//     invoiceId: number | null;
//     onAddSubJob: (subJob: Omit<SubJob, 'jobId'> & { jobId: string }) => void;
// }

// function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
//     const [subJobDetail, setSubJobDetail] = useState<string>('');
//     const [note, setNote] = useState<string>('');
//     const [file, setFile] = useState<string>('');
//     const [depositAmount, setDepositAmount] = useState<string>(''); // Input as string, parse to number
//     const [depositDate, setDepositDate] = useState<Date>();
//     const [paidInFull, setPaidInFull] = useState<Boolean>();
//     const [liaison, setLiaison] = useState<string>('');
//     const [paymentNote, setPaymentNote] = useState<string>('');
    

//     if (!isOpen || !jobId) return null; // Don't render if not open or no jobId provided

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();


//         const newSubJob: Omit<SubJob, 'jobId'> & { jobId: string } = {
//             _id: 'bullshit',
//             jobId: jobId, // Use the jobId from propsinput subJobId to number
//             subJobDetail: subJobDetail,
//             note: note,
//             file: file,
//             depositAmount: parseFloat(depositAmount || '0'), // Parse to number, default to 0
//             depositDate: depositDate,
//             paidInFull: paidInFull,
//             liaison: liaison,
//             paymentNote: paymentNote,
//             isArchived: false,
//             // Add other fields as needed
//         };

//         onAddSubJob(newSubJob);
//         onClose(); // Close the modal after submission

//         // Reset form fields

//         setSubJobDetail('');
//         setNote('');
//         setFile('');
//         setDepositAmount('');
//         setDepositDate(undefined);
//         setPaidInFull(false);
//         setLiaison('');
//         setPaymentNote('');
//     };

//     return (
//         <div className="sub-job-modal-overlay" onClick={onClose}>
//             <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button onClick={onClose} className="sub-job-modal-close-btn">&times;</button>
//                 <form onSubmit={handleSubmit} className="sub-job-modal-form">
//                     <h2>Job Component for Invoice #{invoiceId}</h2>
//                     <div className="form-group">
//                         <label htmlFor="subJobDetail">Sub-Job Detail:</label>
//                         <textarea
//                             id="subJobDetail"
//                             value={subJobDetail}
//                             onChange={(e) => setSubJobDetail(e.target.value)}
//                             rows={4}
//                             required
//                         ></textarea>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="note">Note:</label>
//                         <textarea
//                             id="note"
//                             value={note}
//                             onChange={(e) => setNote(e.target.value)}
//                             rows={2}
//                         ></textarea>
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="file">File:</label>
//                         <input
//                             type="text"
//                             id="file"
//                             value={file}
//                             onChange={(e) => setFile(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="depositAmount">Deposit Amount:</label>
//                         <input
//                             type="number"
//                             id="depositAmount"
//                             value={depositAmount}
//                             onChange={(e) => setDepositAmount(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="depositDate">Deposit Date:</label>
//                         <input
//                             type="date"
//                             id="depositDate"
//                             value={String(depositDate)}
//                             onChange={(e) => setDepositDate(new Date(e.target.value))}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="paidInFull">Paid In Full Date:</label>
//                         <input
//                             type="date"
//                             id="paidInFull"
//                             value={String(paidInFull)}
//                             onChange={(e) => setPaidInFull(new Boolean(e.target.value))}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="liaison">Liaison:</label>
//                         <input
//                             type="text"
//                             id="liaison"
//                             value={liaison}
//                             onChange={(e) => setLiaison(e.target.value)}
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="paymentNote">Payment Note:</label>
//                         <textarea
//                             id="paymentNote"
//                             value={paymentNote}
//                             onChange={(e) => setPaymentNote(e.target.value)}
//                             rows={2}
//                         ></textarea>
//                     </div>
//                     <button type="submit">Add Sub-Job</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddSubJobFormModal;



// AddSubJobFormModal.tsx
import React, { useState } from 'react';
import type { NewSubJobDataForAdd } from '../pages/Schedule'


// Define NewFrameDataForAdd locally
interface NewFrameDataForAdd {
    subJobId: string;
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
}

// Define NewCushionDataForAdd locally
interface NewCushionDataForAdd {
    subJobId: string;
    type: string;
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
}

// Define NewUpholsteryDataForAdd locally
interface NewUpholsteryDataForAdd {
    subJobId: string;
    type: string;
    supplier?: string;
    description?: string;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
}


interface AddSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string | null; // The _id of the parent Job (now passed as jobId for SubJob)
    invoiceId: string | null; // The invoiceId of the parent Job (for display)
    onAddSubJob: (newSubJobData: NewSubJobDataForAdd) => void; // Corrected prop type
}

function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
    // State for Sub-Job Details (Detail Tab)
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [subJobDueDate, setSubJobDueDate] = useState<string>(''); // For SubJob's dueDate

    // State for Frame Details (Frame Tab)
    const [frameSupplier, setFrameSupplier] = useState<string>('');
    const [frameDescription, setFrameDescription] = useState<string>('');
    const [frameOrderedDate, setFrameOrderedDate] = useState<string>('');
    const [frameExpectedDate, setFrameExpectedDate] = useState<string>('');
    const [frameReceivedDate, setFrameReceivedDate] = useState<string>('');

    // State for Cushion Details (Cushion Tab)
    const [cushionSupplier, setCushionSupplier] = useState<string>('');
    const [cushionType, setCushionType] = useState<string>('');
    const [cushionDescription, setCushionDescription] = useState<string>('');
    const [cushionOrderedDate, setCushionOrderedDate] = useState<string>('');
    const [cushionExpectedDate, setCushionExpectedDate] = useState<string>('');
    const [cushionReceivedDate, setCushionReceivedDate] = useState<string>('');

    // State for Upholstery Details (Upholstery Tab)
    const [upholsterySupplier, setUpholsterySupplier] = useState<string>('');
    const [upholsteryType, setUpholsteryType] = useState<string>('');
    const [upholsteryDescription, setUpholsteryDescription] = useState<string>('');
    const [upholsteryOrderedDate, setUpholsteryOrderedDate] = useState<string>('');
    const [upholsteryExpectedDate, setUpholsteryExpectedDate] = useState<string>('');
    const [upholsteryReceivedDate, setUpholsteryReceivedDate] = useState<string>('');

   


    // State to manage the active tab
    const [activeTab, setActiveTab] = useState<'detail' | 'frame' | 'cushion' | 'upholstery' >('detail');

    if (!isOpen || !jobId || invoiceId === null) return null; // Ensure modal only renders if open and necessary IDs are provided

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // The "Add Sub-Job" button will always submit the data from the "Detail" tab
        // as this is the core information required to create a new SubJob.
        // Other tabs' data would typically be added/updated in separate operations
        // after the SubJob is initially created.

        // Basic validation for sub-job detail (the minimum required field)
        if (!subJobDetail) {
            alert('Please fill in the Sub-Job Detail field on the Detail tab.');
            setActiveTab('detail'); // Switch back to detail tab if validation fails
            return;
        }

        // Construct the new sub-job data using only the 'Detail' tab's state
        const newSubJobData: NewSubJobDataForAdd = {
            jobId: jobId, // Pass the parent Job's _id as jobId for the new SubJob
            subJobDetail: subJobDetail,
            note: note,
            file: file,
            dueDate: subJobDueDate ? new Date(subJobDueDate) : undefined, // Convert to Date object or undefined
        };

        // Call the parent handler, passing the jobId and the new sub-job data
        // The parent (Schedule.tsx) will then handle inserting this new SubJob
        // and updating the parent Job's subJobList.
        onAddSubJob(newSubJobData);
        onClose(); // Close the modal after submission

        // Reset all form fields across all tabs
        setSubJobDetail('');
        setNote('');
        setFile('');
        setSubJobDueDate('');

        setFrameSupplier('');
        setFrameDescription('');
        setFrameOrderedDate('');
        setFrameExpectedDate('');
        setFrameReceivedDate('');

        setCushionSupplier('');
        setCushionType('');
        setCushionDescription('');
        setCushionOrderedDate('');
        setCushionExpectedDate('');
        setCushionReceivedDate('');

        setUpholsterySupplier('');
        setUpholsteryType('');
        setUpholsteryDescription('');
        setUpholsteryOrderedDate('');
        setUpholsteryExpectedDate('');
        setUpholsteryReceivedDate('');

        setActiveTab('detail'); // Reset to detail tab after submission
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
                            type="button" // Important: Prevent form submission when clicking a tab
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
                                {/* Existing fields for Sub-Job details */}
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
                                    <label htmlFor="subJobDueDate">Due Date:</label> {/* Added for SubJob */}
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
                            <div className="frame-section">
                                <h3>Frame Details</h3>
                                <div className="form-group">
                                    <label htmlFor="frameSupplier">Supplier:</label>
                                    <input type="text" id="frameSupplier" value={frameSupplier} onChange={(e) => setFrameSupplier(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="frameDescription">Description:</label>
                                    <input type="text" id="frameDescription" value={frameDescription} onChange={(e) => setFrameDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="frameOrderedDate">Ordered Date:</label>
                                    <input type="date" id="frameOrderedDate" value={frameOrderedDate} onChange={(e) => setFrameOrderedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="frameExpectedDate">Expected Date:</label>
                                    <input type="date" id="frameExpectedDate" value={frameExpectedDate} onChange={(e) => setFrameExpectedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="frameReceivedDate">Received Date:</label>
                                    <input type="date" id="frameReceivedDate" value={frameReceivedDate} onChange={(e) => setFrameReceivedDate(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'cushion' && (
                            <div className="cushion-section">
                                <h3>Cushion Details</h3>
                                <div className="form-group">
                                    <label htmlFor="cushionSupplier">Supplier:</label>
                                    <input type="text" id="cushionSupplier" value={cushionSupplier} onChange={(e) => setCushionSupplier(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cushionType">Type:</label>
                                    <input type="text" id="cushionType" value={cushionType} onChange={(e) => setCushionType(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cushionDescription">Description:</label>
                                    <input type="text" id="cushionDescription" value={cushionDescription} onChange={(e) => setCushionDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cushionOrderedDate">Ordered Date:</label>
                                    <input type="date" id="cushionOrderedDate" value={cushionOrderedDate} onChange={(e) => setCushionOrderedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cushionExpectedDate">Expected Date:</label>
                                    <input type="date" id="cushionExpectedDate" value={cushionExpectedDate} onChange={(e) => setCushionExpectedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cushionReceivedDate">Received Date:</label>
                                    <input type="date" id="cushionReceivedDate" value={cushionReceivedDate} onChange={(e) => setCushionReceivedDate(e.target.value)} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'upholstery' && (
                            <div className="upholstery-section">
                                <h3>Upholstery Details</h3>
                                <div className="form-group">
                                    <label htmlFor="upholsterySupplier">Supplier:</label>
                                    <input type="text" id="upholsterySupplier" value={upholsterySupplier} onChange={(e) => setUpholsterySupplier(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upholsteryType">Type:</label>
                                    <input type="text" id="upholsteryType" value={upholsteryType} onChange={(e) => setUpholsteryType(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upholsteryDescription">Description:</label>
                                    <input type="text" id="upholsteryDescription" value={upholsteryDescription} onChange={(e) => setUpholsteryDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upholsteryOrderedDate">Ordered Date:</label>
                                    <input type="date" id="upholsteryOrderedDate" value={upholsteryOrderedDate} onChange={(e) => setUpholsteryOrderedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upholsteryExpectedDate">Expected Date:</label>
                                    <input type="date" id="upholsteryExpectedDate" value={upholsteryExpectedDate} onChange={(e) => setUpholsteryExpectedDate(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="upholsteryReceivedDate">Received Date:</label>
                                    <input type="date" id="upholsteryReceivedDate" value={upholsteryReceivedDate} onChange={(e) => setUpholsteryReceivedDate(e.target.value)} />
                                </div>
                            </div>
                        )}

                    </div>

                    <button type="submit">Add Component</button> {/* This button will submit the currently active tab's data (or all if combined) */}
                </form>
            </div>
        </div>
    );
}

export default AddSubJobFormModal;