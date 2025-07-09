import React, { useState, useEffect } from 'react';
import type { UpdateJobData } from '../pages/Schedule';


interface EditJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit: Job | null; // The job object to be edited, or null if not editing
    onUpdateJob: (jobId: string, updatedData: UpdateJobData) => void;
}

function EditJobFormModal({ isOpen, onClose, jobToEdit, onUpdateJob }: EditJobFormModalProps) {
    // State for form fields, initialized with jobToEdit data
    const [invoiceId, setInvoiceId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [jobName, setJobName] = useState<string>('');
    const [jobType, setJobType] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>(''); // Keep as string for input type="date"

    // Effect to populate form fields when jobToEdit changes (i.e., modal opens for a new job)
    useEffect(() => {
        if (jobToEdit) {
            setInvoiceId(String(jobToEdit.invoiceId) || '');
            setClientName(String(jobToEdit.client) || '');
            setJobName(String(jobToEdit.name) || '');
            setJobType(String(jobToEdit.type) || '');
            // Format Date object to YYYY-MM-DD string for input type="date"
            setDueDate(jobToEdit.due ? jobToEdit.due.toISOString().split('T')[0] : '');
        } else {
            // Reset fields if modal is closed or no job is being edited
            setInvoiceId('');
            setClientName('');
            setJobName('');
            setJobType('');
            setDueDate('');
        }
    }, [jobToEdit]); // Dependency array ensures this runs when jobToEdit changes

    if (!isOpen || !jobToEdit) return null; // Don't render if not open or no job to edit

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation for essential fields
        if (!invoiceId || !clientName || !jobName || !jobType || !dueDate) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct updated job data
        const updatedData: UpdateJobData = {
            invoiceId: invoiceId,
            client: clientName,
            name: jobName,
            type: jobType,
            due: new Date(dueDate), // Convert string date to Date object
        };

        // Call the parent handler to update the job
        // Ensure jobToEdit._id exists before calling
        if (jobToEdit._id) {
            onUpdateJob(String(jobToEdit._id), updatedData);
            // onClose(); // Parent will call onClose after successful update
        } else {
            console.error("Job ID is missing for update.");
            alert("Cannot update job: ID is missing.");
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Edit Job: {jobToEdit.name} || 'N/A'</h2> {/* Display job name in heading */}

                    <div className="form-group">
                        <label htmlFor="invoiceId">Invoice ID:</label>
                        <input
                            type="text"
                            id="invoiceId"
                            value={invoiceId}
                            onChange={(e) => setInvoiceId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientName">Client Name:</label>
                        <input
                            type="text"
                            id="clientName"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobName">Job Name:</label>
                        <input
                            type="text"
                            id="jobName"
                            value={jobName}
                            onChange={(e) => setJobName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobType">Job Type:</label>
                        <input
                            type="text"
                            id="jobType"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Update Job</button>
                </form>
            </div>
        </div>
    );
}

export default EditJobFormModal;