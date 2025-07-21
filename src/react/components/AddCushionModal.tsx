import React, { useState, useEffect } from "react";

interface AddCushionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  subJobId: string; // Primitive string
  subJobDetail: string;
  onAddCushion: (newCushionData: Cushion) => void;
}

function AddCushionFormModal({
  isOpen,
  onClose,
  subJobId,
  subJobDetail,
  onAddCushion,
}: AddCushionFormModalProps) {
  const [type, setType] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [orderedDate, setOrderedDate] = useState<string>("");
  const [expectedDate, setExpectedDate] = useState<string>("");
  const [receivedDate, setReceivedDate] = useState<string>("");
  const [status, setStatus] = useState<string>("In Production");

  // Reset form fields when modal opens/closes or subJobId changes
  useEffect(() => {
    if (!isOpen) {
      setType("");
      setSupplier("");
      setDescription("");
      setOrderedDate("");
      setExpectedDate("");
      setReceivedDate("");
      setStatus("In Production");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate 'type' field is filled (required)
    if (!type.trim()) {
      alert("Please fill in the Type field.");
      return;
    }

    const newCushionData: Cushion = {
      subJobId: subJobId,
      type: type, // Required, convert to String object
      supplier: supplier ? supplier : undefined,
      description: description ? description : undefined,
      orderedDate: orderedDate ? new Date(orderedDate) : undefined,
      expectedDate: expectedDate ? new Date(expectedDate) : undefined,
      receivedDate: receivedDate ? new Date(receivedDate) : undefined,
      status: status ? status : "In Production",
    };

    onAddCushion(newCushionData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="modal-close-btn">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="modal-form">
          <h2>Add Cushion for Sub-Job: {subJobDetail}</h2>
          <div className="form-group">
            <label htmlFor="type">Type: *</label>
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </div>
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

          <button type="submit">Add Cushion</button>
        </form>
      </div>
    </div>
  );
}

export default AddCushionFormModal;
