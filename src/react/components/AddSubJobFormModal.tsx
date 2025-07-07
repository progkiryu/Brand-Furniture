// import React, { useState } from 'react';

// interface NewSubJobDataForAdd {
//     subJobId: string;
//     jobDetail: string;
//     file: string;
//     note: string;
// }

// interface AddSubJobFormModalProps {
//     isOpen: boolean;
//     onSubJobModalClose: () => void;
// }

// function AddSubJobFormModal({isOpen, onSubJobModalClose}:AddSubJobFormModalProps) {
//     const [jobDetail, setJobDetail] = useState<string>('');
//     const [file, setFile] = useState<string>('');
//     const [note, setNote] = useState<string>('');

//     if (!isOpen) return null; 
//     // const handleSubJobFormSubmit = (event: React.FormEvent) => {
//     //     event.preventDefault(); // Prevents the browser's default form submission (page reload)

//     //     // Basic validation
//     //     if (!jobDetail || !file || !note) {
//     //         alert('Please fill in all fields.');
//     //         return;
//     //     }

//     //     // Generate a unique jobId for the new entry
//     //     const newUniqueSubJobId = crypto.randomUUID();

//     //     const newSubJob = {
//     //         subJobId: newUniqueSubJobId,
//     //         jobDetail: jobDetail, 
//     //         file: file,
//     //         note: note,
//     //     };
//     //     setJobDetail('');
//     //     setFile('');
//     //     setNote('');
//     // };
//     return (<>
//         <div className="sub-job-modal-overlay" onClick={onSubJobModalClose}>
//             <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button onClick={onSubJobModalClose} className="sub-job-modal-close-btn">&times;</button>
//                 <div className="sub-job-form-group">
//                     <h2>Details</h2>
//                     <p></p>
//                     <p></p>
//                     <p></p>
        
//                 </div>


//             </div>
//         </div>

//     </>)
// }

// export default AddSubJobFormModal;


// AddSubJobFormModal.tsx
import React, { useState } from 'react';
// import type { SubJob } from '../types/jobTypes-erd'; // Import SubJob type

interface AddSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string | null; // The jobId of the parent Job
    invoiceId: number | null;
    onAddSubJob: (subJob: Omit<SubJob, 'jobId'> & { jobId: string }) => void;
}

function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
    const [subJobId, setSubJobId] = useState<string>(''); // Will be converted to number
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [depositAmount, setDepositAmount] = useState<string>(''); // Input as string, parse to number
    const [depositDate, setDepositDate] = useState<string>('');
    const [paidInFull, setPaidInFull] = useState<string>('');
    const [liaison, setLiaison] = useState<string>('');
    const [paymentNote, setPaymentNote] = useState<string>('');

    // Helper function to generate a simple sequential ID for subJobId
    // In a real app, this might come from the backend or a more robust client-side ID generator
    // const generateSequentialSubJobId = (): number => {
        // This is a very basic way to get a unique ID within the context of the current session.
        // In a real application, fetch the max subJobId for the given jobId
        // or rely on a database to auto-increment.
        // return Math.floor(Math.random() * 1000000); // Simple random for mock
    // };

    if (!isOpen || !jobId) return null; // Don't render if not open or no jobId provided

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (!subJobDetail || !subJobId) { // Add other required fields as needed
            alert('Please fill in required sub-job fields.');
            return;
        }

        const newSubJob: Omit<SubJob, 'jobId'> & { jobId: string } = {
            jobId: jobId, // Use the jobId from propsinput subJobId to number
            subJobDetail: subJobDetail,
            note: note,
            file: file,
            depositAmount: parseFloat(depositAmount || '0'), // Parse to number, default to 0
            depositDate: depositDate,
            paidInFull: paidInFull,
            liaison: liaison,
            paymentNote: paymentNote,
            // Add other fields as needed
        };

        onAddSubJob(newSubJob);
        onClose(); // Close the modal after submission

        // Reset form fields
        setSubJobId('');
        setSubJobDetail('');
        setNote('');
        setFile('');
        setDepositAmount('');
        setDepositDate('');
        setPaidInFull('');
        setLiaison('');
        setPaymentNote('');
    };

    return (
        <div className="sub-job-modal-overlay" onClick={onClose}>
            <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="sub-job-modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="sub-job-modal-form">
                    <h2>Job Component for Invoice #{invoiceId}</h2>
                    <div className="form-group">
                        <label htmlFor="subJobId">Sub-Job ID:</label>
                        <input
                            type="number"
                            id="subJobId"
                            value={subJobId}
                            onChange={(e) => setSubJobId(e.target.value)}
                            required
                        />
                    </div>
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
                        <label htmlFor="depositAmount">Deposit Amount:</label>
                        <input
                            type="number"
                            id="depositAmount"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="depositDate">Deposit Date:</label>
                        <input
                            type="date"
                            id="depositDate"
                            value={depositDate}
                            onChange={(e) => setDepositDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paidInFull">Paid In Full Date:</label>
                        <input
                            type="date"
                            id="paidInFull"
                            value={paidInFull}
                            onChange={(e) => setPaidInFull(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="liaison">Liaison:</label>
                        <input
                            type="text"
                            id="liaison"
                            value={liaison}
                            onChange={(e) => setLiaison(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="paymentNote">Payment Note:</label>
                        <textarea
                            id="paymentNote"
                            value={paymentNote}
                            onChange={(e) => setPaymentNote(e.target.value)}
                            rows={2}
                        ></textarea>
                    </div>
                    <button type="submit">Add Sub-Job</button>
                </form>
            </div>
        </div>
    );
}

export default AddSubJobFormModal;