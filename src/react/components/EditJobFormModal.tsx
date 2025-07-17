// EditJobFormModal.tsx
import React, { useState, useEffect } from 'react';


interface EditJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobToEdit: Job | null; // The job object to be edited, or null if not editing
    onUpdateJob: (updatedData: Job) => void;
    onDeleteJob: (jobId: string) => void; // Add onDeleteJob prop
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
    const [isArchived, setIsArchived] = useState<boolean>(false);

    /**
     * Formats a Date object or string into a 'YYYY-MM-DD' string for date input fields.
     * @param dateValue The date to format, can be Date, string, null, or undefined.
     * @returns Formatted date string or empty string if invalid.
     */
    const formatDateForInput = (dateValue: Date | string | null | undefined): string => {
        if (!dateValue) return '';

        let date: Date;
        if (dateValue instanceof Date) {
            date = dateValue;
        } else {
            date = new Date(dateValue);
        }

        // Check if the date is valid before formatting
        if (isNaN(date.getTime())) {
            return '';
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Effect to populate form fields when jobToEdit changes or modal opens
    useEffect(() => {
        if (isOpen && jobToEdit) {
            setInvoiceId(jobToEdit.invoiceId?.toString() || '');
            setClientName(jobToEdit.client?.toString() || '');
            setJobName(jobToEdit.name?.toString() || '');
            setJobType(jobToEdit.type?.toString() || '');
            setDueDate(formatDateForInput(jobToEdit.due));
            setDepositAmount(jobToEdit.depositAmount?.toString() || '');
            setDepositDate(formatDateForInput(jobToEdit.depositDate));
            setPaidInFull(formatDateForInput(jobToEdit.paidInFull));
            setLiaison(jobToEdit.liaison?.toString() || '');
            setPaymentNote(jobToEdit.paymentNote?.toString() || '');
        } else if (!isOpen) {
            // Reset form fields when modal closes
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
            setIsArchived(false);
        }
    }, [isOpen, jobToEdit]);

    // If modal is not open, return null to not render anything
    if (!isOpen) return null;

    /**
     * Handles the form submission for updating a job.
     * @param event The form submission event.
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!jobToEdit?._id) {
            console.error("Job ID is missing for update.");
            return;
        }

        // Construct the updated Job object
        const updatedData: Job = {
            _id: jobToEdit._id, // Ensure _id is included for update
            invoiceId: invoiceId,
            client: clientName,
            name: jobName,
            type: jobType,
            due: new Date(dueDate),
            depositAmount: depositAmount ? Number(depositAmount) : undefined,
            depositDate: depositDate ? new Date(depositDate) : undefined,
            paidInFull: paidInFull ? new Date(paidInFull) : undefined,
            liaison: liaison,
            paymentNote: paymentNote,
            subJobList: jobToEdit.subJobList, // Preserve existing subJobList
            isPinned: jobToEdit.isPinned,
            isArchived: jobToEdit.isArchived,
        };

        onUpdateJob(updatedData);
        onClose(); // Close modal after update
    };

    /**
     * Handles the deletion of a job.
     */
    const handleDelete = () => {
        if (jobToEdit?._id) {
            // In a real application, you might add a confirmation dialog here
            onDeleteJob(jobToEdit._id.toString());
            onClose(); // Close modal after delete
        } else {
            console.error("Job ID is missing for deletion.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Edit Job: {jobToEdit?.name}</h2>
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
                        <textarea
                            id="jobName"
                            value={jobName}
                            onChange={(e) => setJobName(e.target.value)}
                            rows={4}
                            required
                        ></textarea>
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

                    <div className="form-group">
                        <label htmlFor="jobType">Job Type:</label>

                        <select
                            id="jobType"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="Commercial">Commercial</option>
                            <option value="Residential">Residential</option>
                            <option value="Private">Private</option>
                            <option value="Production">Production</option>
                            <option value="Brand" selected>Brand</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="isArchived">Archive Job:</label>
                        <input
                            type="checkbox"
                            id="isArchived"
                            checked={isArchived}
                            onChange={(e) => setIsArchived(e.target.checked)}
                        />
                    </div>
                    <button type="submit">Update Job</button>
                    <button id="delete-button" type="button" onClick={handleDelete}>Delete Job</button>
                </form>
            </div>
        </div>
    );
}

export default EditJobFormModal;