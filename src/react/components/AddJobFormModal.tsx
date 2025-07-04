// import React, { useState } from 'react';

// interface NewJobDataForAdd {
//     jobId: string;
//     invoiceId: number;
//     client: string;
//     name: string;
//     due: string;
// }

// interface AddJobFormModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     // Update onAddJob to accept the full Job type structure, but without subJobs
//     onAddJob: (job: NewJobDataForAdd) => void;
// }

// function AddJobFormModal({ isOpen, onClose, onAddJob }:AddJobFormModalProps) {
//     const [invoiceId, setInvoiceId] = useState<string>('');
//     const [clientName, setClientName] = useState<string>('');
//     const [jobName, setJobName] = useState<string>('');
//     const [dueDate, setDueDate] = useState<string>('');

//     if (!isOpen) return null; // Don't render if not open

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault(); // Prevents the browser's default form submission (page reload)

//         // Basic validation
//         if (!invoiceId || !clientName || !jobName || !dueDate) {
//             alert('Please fill in all fields.');
//             return;
//         }

//         // Generate a unique jobId for the new entry
//         const newUniqueJobId = crypto.randomUUID();

//         const newJob = {
//             jobId: newUniqueJobId, // Use the generated unique ID
//             invoiceId: parseInt(invoiceId), // Convert to number as per Job interface
//             client: clientName,
//             name: jobName,
//             due: dueDate,
//             // subJobs will be an empty array as per requirements
//         };

//         onAddJob(newJob); // Pass new job data to parent
//         // Reset form fields
//         setInvoiceId('');
//         setClientName('');
//         setJobName('');
//         setDueDate('');
//     };

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing modal */}
//                 <button onClick={onClose} className="modal-close-btn">&times;</button>
//                 <form onSubmit={handleSubmit} className="modal-form">
//                     <h2>Add New Job</h2>
//                     <div className="form-group">
//                         <label htmlFor="invoiceId">Invoice ID:</label>
//                         <input
//                             type="number" // Use number type for Invoice ID input
//                             id="invoiceId"
//                             value={invoiceId}
//                             onChange={(e) => setInvoiceId(e.target.value)}
//                             // required // Make it required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="clientName">Client Name:</label>
//                         <input
//                             type="text"
//                             id="clientName"
//                             value={clientName}
//                             onChange={(e) => setClientName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="jobName">Job Name:</label>
//                         <input
//                             type="text"
//                             id="jobName"
//                             value={jobName}
//                             onChange={(e) => setJobName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="dueDate">Due Date:</label>
//                         <input
//                             type="date" // Use date type for due date
//                             id="dueDate"
//                             value={dueDate}
//                             onChange={(e) => setDueDate(e.target.value)}
//                             required // Make it required
//                         />
//                     </div>
//                     <button type="submit">Add Job</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddJobFormModal;


// AddJobFormModal.tsx
import React, { useState } from 'react';

// Define NewJobDataForAdd interface directly in this file
interface NewJobDataForAdd {
    jobId: string;
    invoiceId: number; // Changed from 'id' to 'invoiceId' for consistency
    client: string;
    name: string;
    type: string; // Added 'type' for consistency
    due: string;
}

interface AddJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddJob: (job: NewJobDataForAdd) => void;
}


function AddJobFormModal({ isOpen, onClose, onAddJob }: AddJobFormModalProps) {
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
        const newUniqueJobId = crypto.randomUUID();

        const newJob: NewJobDataForAdd = {
            jobId: newUniqueJobId,
            invoiceId: parseInt(invoiceId), // Ensure it's 'invoiceId'
            client: clientName,
            name: jobName,
            type: jobType, // Include job type
            due: dueDate,
        };

        onAddJob(newJob);
        // Reset form fields
        setInvoiceId('');
        setClientName('');
        setJobName('');
        setJobType('');
        setDueDate('');
    };

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
}

export default AddJobFormModal;