import React, { useState, useEffect } from 'react';



interface EditJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit: Job | null; // The job object to be edited, or null if not editing
    onUpdateJob: (jobId: string, updatedData: Job) => void;
    onDeleteJob: (jobId: string) => void;
}

function EditJobFormModal({ isOpen, onClose, jobToEdit, onUpdateJob, onDeleteJob }: EditJobFormModalProps) {
    // State for form fields, initialized with jobToEdit data
    const [invoiceId, setInvoiceId] = useState<string>('');
    const [clientName, setClientName] = useState<string>('');
    const [jobName, setJobName] = useState<string>('');
    const [jobType, setJobType] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>(''); // Keep as string for input type="date"
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [depositDate, setDepositDate] = useState<string>('');
    const [paidInFull, setPaidInFull] = useState<string>(''); // Boolean for checkbox
    const [liaison, setLiaison] = useState<string>('');
    const [paymentNote, setPaymentNote] = useState<string>('');

    const formatDateForInput = (dateValue: Date | string | null | undefined): string => {
        if (!dateValue) return '';

        let date: Date;
        if (dateValue instanceof Date) {
            date = dateValue;
        } else if (typeof dateValue === 'string') {
            date = new Date(dateValue);
        } else {
            return ''; // Invalid type
        }

        if (isNaN(date.getTime())) {
            return ''; // Invalid date
        }

        // Return in YYYY-MM-DD format
        return date.toISOString().split('T')[0];
    };


    useEffect(() => {
        if (jobToEdit) {
            // Basic text fields
            setInvoiceId(String(jobToEdit.invoiceId) || '');
            setClientName(String(jobToEdit.client) || '');
            setJobName(String(jobToEdit.name) || '');
            setJobType(String(jobToEdit.type) || '');

            // Date fields: Convert to YYYY-MM-DD string for input type="date"
            setDueDate(formatDateForInput(jobToEdit.due));
            setDepositDate(formatDateForInput(jobToEdit.depositDate));
            setPaidInFull(formatDateForInput(jobToEdit.paidInFull)); // Use new state variable

            // Number fields: Convert to string
            setDepositAmount(String(jobToEdit.depositAmount || '') || ''); // Handle potential undefined/null

            // Other text fields
            setLiaison(String(jobToEdit.liaison || '') || '');
            setPaymentNote(String(jobToEdit.paymentNote || '') || '');

        } else {
            // Reset all fields when modal is closed or no job is being edited
            setInvoiceId('');
            setClientName('');
            setJobName('');
            setJobType('');
            setDueDate('');
            setDepositAmount('');
            setDepositDate('');
            setPaidInFull('');
            setLiaison('');
            setPaymentNote('');
        }
    }, [jobToEdit]); 

    if (!isOpen || !jobToEdit) return null; // Don't render if not open or no job to edit

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Basic validation for essential fields
        if (!invoiceId || !clientName || !jobName || !jobType || !dueDate) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct updated job data
        const updatedData: Job = {
            invoiceId: invoiceId,
            client: clientName,
            name: jobName,
            type: jobType,
            due: new Date(dueDate), // Convert string date to Date object
            depositDate: new Date(depositDate),
            depositAmount: Number(depositAmount),
            paidInFull: new Date(paidInFull),
            liaison: liaison,
            paymentNote: paymentNote,
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

    const handleDelete = () => {
        onDeleteJob(String(jobToEdit._id));
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Edit Job: {jobToEdit.name} #{jobToEdit.invoiceId}</h2> {/* Display job name in heading */}

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
                        <label htmlFor="paidInFull">Paid In Full:</label>
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
                        <label htmlFor="paymentNote">Payment Notes:</label>
                        <input
                            type="text"
                            id="paymentNote"
                            value={paymentNote}
                            onChange={(e) => setPaymentNote(e.target.value)}
                            
                        />
                    </div>

                    <button type="submit">Update Job</button>
                    <button id="delete-button" onClick={handleDelete}>Delete Job</button>
                </form>
            </div>
        </div>
    );
}

export default EditJobFormModal;