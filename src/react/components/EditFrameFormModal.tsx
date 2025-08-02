// EditFrameFormModal.tsx
import React, { useState, useEffect } from "react";

interface EditFrameFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  frameToEdit: Frame | null; // The frame object to be edited
  onUpdateFrame: (updatedData: Frame) => void;
  onDeleteFrame: (frameId: string) => void;
}

function EditFrameFormModal({
  isOpen,
  onClose,
  frameToEdit,
  onUpdateFrame,
  onDeleteFrame,
}: EditFrameFormModalProps) {
  const [supplier, setSupplier] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [orderedDate, setOrderedDate] = useState<string>("");
  const [expectedDate, setExpectedDate] = useState<string>("");
  const [receivedDate, setReceivedDate] = useState<string>("");
  const [status, setStatus] = useState<string>("In Production");

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
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Effect to populate form fields when frameToEdit changes or modal opens
  useEffect(() => {
    if (isOpen && frameToEdit) {
      setSupplier(frameToEdit.supplier?.toString() || "");
      setDescription(frameToEdit.description?.toString() || "");
      setOrderedDate(formatDateForInput(frameToEdit.orderedDate));
      setExpectedDate(formatDateForInput(frameToEdit.expectedDate));
      setReceivedDate(formatDateForInput(frameToEdit.receivedDate));
      setStatus(frameToEdit.status?.toString() || "In Production");
      setHasChanged(false);
    } else if (!isOpen) {
      // Reset form fields when modal closes
      setSupplier("");
      setDescription("");
      setOrderedDate("");
      setExpectedDate("");
      setReceivedDate("");
      setStatus("In Production");
      setHasChanged(false);
    }
  }, [isOpen, frameToEdit]);

  useEffect(() => {
    if (frameToEdit) {
      const currentSupplier = supplier;
      const currentDescription = description;
      const currentOrderedDate = orderedDate;
      const currentExpectedDate = expectedDate;
      const currentReceivedDate = receivedDate;
      const currentStatus = status;

      const originalSupplier = frameToEdit.supplier?.toString() || "";
      const originalDescription = frameToEdit.description?.toString() || "";
      const originalOrderedDate = formatDateForInput(frameToEdit.orderedDate);
      const originalExpectedDate = formatDateForInput(frameToEdit.expectedDate);
      const originalReceivedDate = formatDateForInput(frameToEdit.receivedDate);
      const originalStatus = frameToEdit.status?.toString() || "In Production";

      const changed =
        currentSupplier !== originalSupplier ||
        currentDescription !== originalDescription ||
        currentOrderedDate !== originalOrderedDate ||
        currentExpectedDate !== originalExpectedDate ||
        currentReceivedDate !== originalReceivedDate ||
        currentStatus !== originalStatus;

      setHasChanged(changed);
    }
  }, [
    supplier,
    description,
    orderedDate,
    expectedDate,
    receivedDate,
    status,
    frameToEdit,
  ]);

  if (!isOpen) return null;

  /**
   * Handles the form submission for updating a frame.
   * @param event The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanged) {
      // If no changes, just close the modal
      onClose();
      return;
    }

    if (!frameToEdit?._id) {
      console.error("Frame ID is missing for update.");
      return;
    }

    const updatedData: Frame = {
      _id: frameToEdit._id,
      subJobId: frameToEdit.subJobId, // Preserve existing subJobId
      supplier: supplier,
      description: description,
      orderedDate: orderedDate ? new Date(orderedDate) : undefined,
      expectedDate: expectedDate ? new Date(expectedDate) : undefined,
      receivedDate: receivedDate ? new Date(receivedDate) : undefined,
      status: status ? status : "In Production",
    };

    onUpdateFrame(updatedData);
    onClose();
  };

  /**
   * Handles the deletion of a frame.
   */
  const handleDelete = () => {
    if (frameToEdit?._id) {
      onDeleteFrame(frameToEdit._id.toString());
      onClose();
    } else {
      console.error("Frame ID is missing for deletion.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit} className="modal-form">
          <h2>Edit Frame: {frameToEdit?.description}</h2>
          <div className="supplier-description-status-dates-container">
            <div className="supplier-description-status-container">
              <div className="form-group">
                <label htmlFor="supplier">Supplier:</label>
                <input
                  type="text"
                  id="supplier"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Frame Foamed">Frame Foamed</option>
                  <option value="In Production">In Production</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
            </div>
            <div className="dates-container">
              <div className="form-group">
                <label htmlFor="orderedDate">Ordered Date:</label>
                <input
                  type="date"
                  id="orderedDate"
                  value={orderedDate}
                  onChange={(e) => setOrderedDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="expectedDate">Expected Date:</label>
                <input
                  type="date"
                  id="expectedDate"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="receivedDate">Received Date:</label>
                <input
                  type="date"
                  id="receivedDate"
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="buttons-container">
            <button type="submit">Update</button>
            <button id="delete-button" type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditFrameFormModal;
