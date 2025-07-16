// AddJobFormModal.tsx
import React, { useState} from 'react';

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
    const [depositAmount, setDepositAmount] = useState<string>('');
    const [depositDate, setDepositDate] = useState<string>('');
    const [paidInFull, setPaidInFull] = useState<string>(''); // Boolean for checkbox
    const [liaison, setLiaison] = useState<string>('');
    const [paymentNote, setPaymentNote] = useState<string>('');
    const [isArchived, setIsArchived] = useState<boolean>(false);

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
            depositDate: new Date(depositDate),
            depositAmount: new Number(depositAmount),
            paidInFull: new Date(paidInFull),
            liaison: liaison,
            paymentNote: paymentNote,
            isArchived: isArchived, 
        };
        
        onAddJob(newJob);
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
    

    return (
        <div className="modal-overlay">
            <div className="modal-content">
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
                        <label htmlFor="isArchived">Archive Job:</label>
                        <input
                            type="checkbox"
                            id="isArchived"
                            checked={isArchived}
                            onChange={(e) => setIsArchived(e.target.checked)}
                        />
                    </div>
                    <button type="submit">Add Job</button>
                </form>
            </div>
        </div>
    );
}

export default AddJobFormModel;