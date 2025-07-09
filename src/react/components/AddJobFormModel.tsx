// AddJobFormModal.tsx
import React, { useState } from 'react';

// Define NewJobDataForAdd interface directly in this file

export interface AddJobFormModelProps {
    isOpen: boolean;
    onClose: () => void;
    onAddJob: (job: Job) => void;
}


function AddJobFormModel({ isOpen, onClose, onAddJob}: AddJobFormModelProps) {
    const [invoiceId, setInvoiceId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [jobName, setJobName] = useState<string>('');
    const [jobType, setJobType] = useState<string>(''); // New state for job type
    const [dueDate, setDueDate] = useState<string>('');

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation
        if (!invoiceId || !clientName || !jobName || !jobType || !dueDate) {
            alert('Please fill in all fields.');
            return;
        }

        // const newUniqueJobId = generateMongoStyleId(); // Use MongoDB-style ID

        const newJob: Job = {
            invoiceId: invoiceId,
            client: clientName,
            name: jobName,
            type: jobType, // Added 'type' as per your mock data
            due: new Date(dueDate),
        };
        
        onAddJob(newJob);
        // Reset form fields
        setInvoiceId('');
        setClientName('');
        setJobName('');
        setJobType('');
        setDueDate('');


    

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">

                    <h2>Add New Job</h2>
                    <div className="form-group">
                        
                        <label htmlFor="invoiceId">Invoice ID:</label>
                        <input
                            type="number"
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
                            value={String(dueDate)}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Add Job</button>
                </form>
            </div>
        </div>
    );
}

export default AddJobFormModel;