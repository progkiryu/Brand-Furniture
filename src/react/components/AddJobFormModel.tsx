import React, { useState, useEffect } from "react";

// Define NewJobDataForAdd interface directly in this file

export interface AddJobFormModelProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (job: Job) => void;
}

function AddJobFormModel({ isOpen, onClose, onAddJob }: AddJobFormModelProps) {
  const [invoiceId, setInvoiceId] = useState<string>("");
  const [poNumber, setPONumber] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [jobName, setJobName] = useState<string>("");
  const [jobType, setJobType] = useState<string>("Commercial"); // New state for job type
  const [dueDate, setDueDate] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositDate, setDepositDate] = useState<string>("");
  const [paidInFull, setPaidInFull] = useState<string>(""); // Boolean for checkbox
  const [liaison, setLiaison] = useState<string>("");
  const [paymentNote, setPaymentNote] = useState<string>("");
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [hasNoDeletedNotification, setHasNoDeletedNotification] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setInvoiceId("");
      setPONumber("");
      setClientName("");
      setJobName("");
      setJobType("Commercial");
      setDueDate("");
      setDepositAmount("");
      setDepositDate("");
      setPaidInFull("");
      setLiaison("");
      setPaymentNote("");
      setIsArchived(false);
      setIsPinned(false);
      setHasNoDeletedNotification(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (!clientName || !jobName) {
      return;
    }

    const newJob: Job = {
      invoiceId: invoiceId,
      poNumber: poNumber,
      client: clientName,
      name: jobName,
      type: jobType, // Added 'type' as per your mock data
      due: new Date(dueDate),
      depositDate: new Date(depositDate),
      depositAmount: new Number(depositAmount),
      paidInFull: paidInFull ? new Date(paidInFull) : undefined,
      liaison: liaison,
      paymentNote: paymentNote,
      isArchived: isArchived,
      isPinned: isPinned,
      hasNoDeletedNotification: true,
    };

    onAddJob(newJob);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2>Add New Job</h2>
          <div className="form-group">
            <label htmlFor="invoiceId">Invoice ID:</label>
            <textarea
              rows={1}
              id="invoiceId"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="poNumber">Purchase Order No:</label>
            <textarea
              id="poNumber"
              value={poNumber}
              onChange={(e) => setPONumber(e.target.value)}
              rows={1}
            />
          </div>
          <div className="form-group">
            <label htmlFor="clientName">Client Name:</label>
            <textarea
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              rows={1}
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
              <option value="Brand">Brand</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="isArchived">Archive Job:</label>
            <input
              type="checkbox"
              id="isArchived"
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
