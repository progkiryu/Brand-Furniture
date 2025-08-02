import React, { useState, useEffect } from "react";

interface EditJobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobToEdit: Job | null;
  onUpdateJob: (updatedData: Job) => void;
  onDeleteJob: (jobId: string) => void;
}

function EditJobFormModal({
  isOpen,
  onClose,
  jobToEdit,
  onUpdateJob,
  onDeleteJob,
}: EditJobFormModalProps) {
  // State for form fields, initialized with jobToEdit data
  const [invoiceId, setInvoiceId] = useState<string>("");
  const [poNumber, setPONumber] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [jobName, setJobName] = useState<string>("");
  const [jobType, setJobType] = useState<string>("Commercial");
  const [dueDate, setDueDate] = useState<string>("");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositDate, setDepositDate] = useState<string>("");
  const [paidInFull, setPaidInFull] = useState<string>("");
  const [liaison, setLiaison] = useState<string>("");
  const [paymentNote, setPaymentNote] = useState<string>("");
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const [hasNoDeletedNotification, setHasNoDeletedNotification] =
    useState<boolean>(true);

  // State to track if any field has been changed
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  /**
   * Formats a Date object or string into a 'YYYY-MM-DD' string for date input fields.
   * @param dateValue The date to format, can be Date, string, null, or undefined.
   * @returns Formatted date string or empty string if invalid.
   */
  const formatDateForInput = (
    dateValue: Date | string | null | undefined
  ): string => {
    if (!dateValue) return "";

    let date: Date;
    if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      date = new Date(dateValue);
    }

    // Check if the date is valid before formatting
    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Effect to populate form fields when jobToEdit changes or modal opens
  useEffect(() => {
    if (isOpen && jobToEdit) {
      setInvoiceId(jobToEdit.invoiceId?.toString() || "");
      setPONumber(jobToEdit.poNumber?.toString() || "");
      setClientName(jobToEdit.client?.toString() || "");
      setJobName(jobToEdit.name?.toString() || "");
      setJobType(jobToEdit.type?.toString() || "");
      setDueDate(formatDateForInput(jobToEdit.due));
      setDepositAmount(jobToEdit.depositAmount?.toString() || "");
      setDepositDate(formatDateForInput(jobToEdit.depositDate));
      setPaidInFull(formatDateForInput(jobToEdit.paidInFull));
      setLiaison(jobToEdit.liaison?.toString() || "");
      setPaymentNote(jobToEdit.paymentNote?.toString() || "");
      setIsArchived(jobToEdit.isArchived);
      setHasNoDeletedNotification(jobToEdit.hasNoDeletedNotification || true);
      setHasChanged(false); // Reset hasChanged when modal opens or jobToEdit changes
    } else if (!isOpen) {
      // Reset form fields and hasChanged when modal closes
      setInvoiceId("");
      setPONumber("");
      setClientName("");
      setJobName("");
      setJobType("");
      setDueDate("");
      setDepositAmount("");
      setDepositDate("");
      setPaidInFull("");
      setLiaison("");
      setPaymentNote("");
      setIsArchived(false);
      setHasNoDeletedNotification(true);
      setHasChanged(false);
    }
  }, [isOpen, jobToEdit]);

  // Effect to check for changes whenever form fields update
  useEffect(() => {
    if (jobToEdit) {
      const currentInvoiceId = invoiceId;
      const currentPONumber = poNumber;
      const currentClientName = clientName;
      const currentJobName = jobName;
      const currentJobType = jobType;
      const currentDueDate = dueDate;
      const currentDepositAmount = depositAmount;
      const currentDepositDate = depositDate;
      const currentPaidInFull = paidInFull;
      const currentLiaison = liaison;
      const currentPaymentNote = paymentNote;
      const currentIsArchived = isArchived;
      const currentHasNoDeletedNotification = hasNoDeletedNotification;

      const originalInvoiceId = jobToEdit.invoiceId?.toString() || "";
      const originalPONumber = jobToEdit.poNumber?.toString() || "";
      const originalClientName = jobToEdit.client?.toString() || "";
      const originalJobName = jobToEdit.name?.toString() || "";
      const originalJobType = jobToEdit.type?.toString() || "";
      const originalDueDate = formatDateForInput(jobToEdit.due);
      const originalDepositAmount = jobToEdit.depositAmount?.toString() || "";
      const originalDepositDate = formatDateForInput(jobToEdit.depositDate);
      const originalPaidInFull = formatDateForInput(jobToEdit.paidInFull);
      const originalLiaison = jobToEdit.liaison?.toString() || "";
      const originalPaymentNote = jobToEdit.paymentNote?.toString() || "";
      const originalIsArchived = jobToEdit.isArchived;
      const originalHasNoDeletedNotification =
        jobToEdit.hasNoDeletedNotification || true;

      const changed =
        currentInvoiceId !== originalInvoiceId ||
        currentPONumber !== originalPONumber ||
        currentClientName !== originalClientName ||
        currentJobName !== originalJobName ||
        currentJobType !== originalJobType ||
        currentDueDate !== originalDueDate ||
        currentDepositAmount !== originalDepositAmount ||
        currentDepositDate !== originalDepositDate ||
        currentPaidInFull !== originalPaidInFull ||
        currentLiaison !== originalLiaison ||
        currentPaymentNote !== originalPaymentNote ||
        currentIsArchived !== originalIsArchived ||
        currentHasNoDeletedNotification !== originalHasNoDeletedNotification;

      setHasChanged(changed);
    }
  }, [
    invoiceId,
    poNumber,
    clientName,
    jobName,
    jobType,
    dueDate,
    depositAmount,
    depositDate,
    paidInFull,
    liaison,
    paymentNote,
    isArchived,
    hasNoDeletedNotification,
    jobToEdit,
  ]);

  // If modal is not open, return null to not render anything
  if (!isOpen) return null;

  /**
   * Handles the form submission for updating a job.
   * If no changes are detected, it simply closes the modal.
   * @param event The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanged) {
      // If no changes, just close the modal
      onClose();
      return;
    }

    if (!jobToEdit?._id) {
      console.error("Job ID is missing for update.");
      return;
    }

    // Construct the updated Job object
    const updatedData: Job = {
      _id: jobToEdit._id,
      invoiceId: invoiceId,
      poNumber: poNumber,
      client: clientName,
      name: jobName,
      type: jobType,
      due: new Date(dueDate), // Set to undefined if empty string
      depositAmount: depositAmount ? new Number(depositAmount) : new Number(0),
      depositDate: depositDate ? new Date(depositDate) : undefined,
      paidInFull: paidInFull ? new Date(paidInFull) : undefined,
      liaison: liaison,
      paymentNote: paymentNote,
      subJobList: jobToEdit.subJobList,
      isPinned: jobToEdit.isPinned,
      isArchived: isArchived,
      hasNoDeletedNotification: hasNoDeletedNotification,
    };

    onUpdateJob(updatedData);
    onClose(); // Close modal after update
  };

  /**
   * Handles the deletion of a job.
   */
  const handleDelete = () => {
    if (jobToEdit?._id) {
      onDeleteJob(jobToEdit._id.toString());
      onClose(); // Close modal after delete
    } else {
      console.error("Job ID is missing for deletion.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2>Edit Job: {jobToEdit?.name}</h2>
          <div className="id-po-due-container">
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
              <label htmlFor="dueDate">Due Date:</label>
              <input
                type="date"
                id="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
          <div className="client-job-container">
            <div className="form-group">
              <label htmlFor="clientName">Client Name:</label>
              <textarea
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                rows={4}
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
          </div>
          <div className="payment-container">
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
          </div>

          <div className="liason-payment-container">
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
              checked={isArchived}
              onChange={(e) => setIsArchived(e.target.checked)}
            />
          </div>
          <div className="buttons-container">
            <button type="submit">Update Job</button>
            <button id="delete-button" type="button" onClick={handleDelete}>
              Delete Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobFormModal;
