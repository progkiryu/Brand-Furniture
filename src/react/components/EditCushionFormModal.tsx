import React, { useState, useEffect } from "react";

interface EditCushionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  cushionToEdit: Cushion | null; // The cushion object to be edited
  onUpdateCushion: (updatedData: Cushion) => void;
  onDeleteCushion: (cushionId: string) => void;
}

function EditCushionFormModal({
  isOpen,
  onClose,
  cushionToEdit,
  onUpdateCushion,
  onDeleteCushion,
}: EditCushionFormModalProps) {
  const [type, setType] = useState<string>("");
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

  // Effect to populate form fields when cushionToEdit changes or modal opens
  useEffect(() => {
    if (isOpen && cushionToEdit) {
      setType(cushionToEdit.type?.toString() || "");
      setSupplier(cushionToEdit.supplier?.toString() || "");
      setDescription(cushionToEdit.description?.toString() || "");
      setOrderedDate(formatDateForInput(cushionToEdit.orderedDate));
      setExpectedDate(formatDateForInput(cushionToEdit.expectedDate));
      setReceivedDate(formatDateForInput(cushionToEdit.receivedDate));
      setStatus(cushionToEdit.status?.toString() || "In Production");
      setHasChanged(false);
    } else if (!isOpen) {
      // Reset form fields when modal closes
      setType("");
      setSupplier("");
      setDescription("");
      setOrderedDate("");
      setExpectedDate("");
      setReceivedDate("");
      setStatus("In Production");
      setHasChanged(false);
    }
  }, [isOpen, cushionToEdit]);

  useEffect(() => {
    if (cushionToEdit) {
      const currentType = type;
      const currentSupplier = supplier;
      const currentDescription = description;
      const currentOrderedDate = orderedDate;
      const currentExpectedDate = expectedDate;
      const currentReceivedDate = receivedDate;
      const currentStatus = status;

      const originalType = cushionToEdit.type?.toString() || "";
      const originalSupplier = cushionToEdit.supplier?.toString() || "";
      const originalDescription = cushionToEdit.description?.toString() || "";
      const originalOrderedDate = formatDateForInput(cushionToEdit.orderedDate);
      const originalExpectedDate = formatDateForInput(
        cushionToEdit.expectedDate
      );
      const originalReceivedDate = formatDateForInput(
        cushionToEdit.receivedDate
      );
      const originalStatus =
        cushionToEdit.status?.toString() || "In Production";

      const changed =
        currentType !== originalType ||
        currentSupplier !== originalSupplier ||
        currentDescription !== originalDescription ||
        currentOrderedDate !== originalOrderedDate ||
        currentExpectedDate !== originalExpectedDate ||
        currentReceivedDate !== originalReceivedDate ||
        currentStatus !== originalStatus;

      setHasChanged(changed);
    }
  }, [
    type,
    supplier,
    description,
    orderedDate,
    expectedDate,
    receivedDate,
    status,
    cushionToEdit,
  ]);

  if (!isOpen) return null;

  /**
   * Handles the form submission for updating a cushion.
   * @param event The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!hasChanged) {
      // If no changes, just close the modal
      onClose();
      return;
    }

    if (!cushionToEdit?._id) {
      console.error("Cushion ID is missing for update.");
      return;
    }

    // Validate 'type' field is filled (required)
    if (!type.trim()) {
      // In a real application, you might show a more user-friendly error message
      console.error("Please fill in the Type field.");
      return;
    }

    const updatedData: Cushion = {
      _id: cushionToEdit._id,
      subJobId: cushionToEdit.subJobId, // Preserve existing subJobId
      type: type,
      supplier: supplier,
      description: description,
      orderedDate: orderedDate ? new Date(orderedDate) : undefined,
      expectedDate: expectedDate ? new Date(expectedDate) : undefined,
      receivedDate: receivedDate ? new Date(receivedDate) : undefined,
      status: status ? status : "In Production",
    };

    onUpdateCushion(updatedData);
    onClose();
  };

  /**
   * Handles the deletion of a cushion.
   */
  const handleDelete = () => {
    if (cushionToEdit?._id) {
      onDeleteCushion(cushionToEdit._id.toString());
      onClose();
    } else {
      console.error("Cushion ID is missing for deletion.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>

        <form onSubmit={handleSubmit} className="modal-form">
          <h2>
            Edit Cushion: {cushionToEdit?.description || cushionToEdit?.type}
          </h2>
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
                  rows={2}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="type">Type:<span className="required">*</span></label>
                <input
                  type="text"
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="In Production">In Production</option>
                  <option value="Upholstery Cut">Upholstery Cut</option>
                  <option value="Upholstery Sewn">Upholstery Sewn</option>
                  <option value="Body Upholstered">Body Upholstered</option>
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

export default EditCushionFormModal;
