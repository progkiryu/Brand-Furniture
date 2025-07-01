import React, { useState } from 'react';
import type { Job } from '../types/jobTypes'; // Import Job type

interface AddJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddJob: (job: Omit<Job, 'subJobs'>) => void; // Omit subJobs as it will be empty initially
}

const AddJobFormModal: React.FC<AddJobFormModalProps> = ({ isOpen, onClose, onAddJob }) => {
    const [invoiceId, setInvoiceId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [jobName, setJobName] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');

    if (!isOpen) return null; // Don't render if not open

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Basic validation
        if (!invoiceId || !clientName || !jobName || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        const newJob = {
            id: parseInt(invoiceId), // Convert to number
            client: clientName,
            name: jobName,
            due: dueDate,
            // subJobs will be an empty array as per requirements
        };

        onAddJob(newJob); // Pass new job data to parent
        // Reset form fields
        setInvoiceId('');
        setClientName('');
        setJobName('');
        setDueDate('');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing modal */}
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Add New Job</h2>
                    <div className="form-group">
                        <label htmlFor="invoiceId">Invoice ID:</label>
                        <input
                            type="number" // Use number type for ID
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
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                            type="date" // Use date type for due date
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Job</button>
                </form>
            </div>
        </div>
    );
};

export default AddJobFormModal;