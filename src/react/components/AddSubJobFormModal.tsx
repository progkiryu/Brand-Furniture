// AddSubJobFormModal.tsx
import React, { useState, useEffect } from 'react';


// --- Props Interface ---
interface AddSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobId: string | null; // This jobId is passed as a primitive string
    invoiceId: string | null; // This invoiceId is passed as a primitive string
    // onAddSubJob now directly expects a SubJobForCreation object
    onAddSubJob: (newSubJobData: SubJob) => void;
}

function AddSubJobFormModal({ isOpen, onClose, jobId, invoiceId, onAddSubJob }: AddSubJobFormModalProps) {
    // --- State for Sub-Job Details ---
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [subJobDueDate, setSubJobDueDate] = useState<string>('');

    // --- Effect for Reset on Close ---
    useEffect(() => {
        if (!isOpen) { // Reset all state when modal closes
            setSubJobDetail('');
            setNote('');
            setFile('');
            setSubJobDueDate('');
        }
    }, [isOpen]);

    // --- Early Exit if Modal Not Open or Missing Required IDs ---
    if (!isOpen || !jobId || invoiceId === null) return null;

    // --- Handle Form Submission ---
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation for sub-job detail (the minimum required field)
        if (!subJobDetail.trim()) {
            alert('Please fill in the Sub-Job Detail field.');
            return;
        }

        // Construct the new sub-job data
        // Ensure all string properties are `String` objects as per your types.d.ts
        const newSubJobData: SubJob = {
            jobId: jobId, // Convert primitive string `jobId` to `String` object
            subJobDetail: subJobDetail,
            note: note ? note : undefined,
            file: file ? file : undefined,
            dueDate: subJobDueDate ? new Date(subJobDueDate) : undefined,
            frameList: [], // Empty lists as no components are added via this simplified form
            cushionList: [],
            upholsteryList: [],
        };

        onAddSubJob(newSubJobData); // Pass the comprehensive data
        onClose(); // Close the modal after submission
    };

    return (
        <div className="sub-job-modal-overlay" onClick={onClose}>
            <div className="sub-job-modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="sub-job-modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="sub-job-modal-form">
                    <h2>Add Sub-Job for Invoice #{invoiceId}</h2>

                    {/* Only the Detail Section */}
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

                    <button type="submit">Add Sub-Job</button>
                </form>
            </div>
        </div>
    );
}

export default AddSubJobFormModal;



