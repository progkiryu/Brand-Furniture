import React, { useState, useEffect } from "react";
import path from 'path-browserify'; // Import path-browserify for path.basename

// --- Props Interface ---
interface AddSubJobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string | null; // This jobId is passed as a primitive string
  invoiceId: string | null; // This invoiceId is passed as a primitive string
  // onAddSubJob now directly expects a SubJobForCreation object
  onAddSubJob: (newSubJobData: SubJob) => void;
}

function AddSubJobFormModal({
  isOpen,
  onClose,
  jobId,
  invoiceId,
  onAddSubJob,
}: AddSubJobFormModalProps) {
  // --- State for Sub-Job Details ---
  const [subJobDetail, setSubJobDetail] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [files, setFiles] = useState<string[]>([""]);
  const [subJobDueDate, setSubJobDueDate] = useState<string>("");

  // --- Effect for Reset on Close ---
  useEffect(() => {
    if (!isOpen) {
      // Reset all state when modal closes
      setSubJobDetail("");
      setNote("");
      setFiles([""]);
      setSubJobDueDate("");
    }
  }, [isOpen]);

  // --- Early Exit if Modal Not Open or Missing Required IDs ---
  if (!isOpen || !jobId) return null;

  // --- Handle Form Submission ---
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation for sub-job detail (the minimum required field)
    if (!subJobDetail.trim()) {
      alert("Please fill in the Sub-Job Detail field.");
      return;
    }

    // Construct the new sub-job data
    // Ensure all string properties are `String` objects as per your types.d.ts
    const newSubJobData: SubJob = {
      jobId: jobId, // Convert primitive string `jobId` to `String` object
      subJobDetail: subJobDetail,
      note: note ? note : undefined,
      file: files.filter(filePath => filePath.trim() !== ""),
      dueDate: subJobDueDate ? new Date(subJobDueDate) : undefined,
      frameList: [], // Empty lists as no components are added via this simplified form
      cushionList: [],
      upholsteryList: [],
    };

    onAddSubJob(newSubJobData); // Pass the comprehensive data
    onClose(); // Close the modal after submission
  };

  const handleFileChange = async (index: number) => {
    const filePath = await window.electron.openFileDialog();
    if (filePath) {
      const newFiles = [...files];
      newFiles[index] = filePath;
      setFiles(newFiles);
    }
  };

  const handleAddFile = () => {
    setFiles([...files, ""]); // Add a new empty string for a new file input
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    // Ensure there's always at least one input field
    setFiles(newFiles.length === 0 ? [""] : newFiles);
  };

  const getFileName = (filePath: string) => {
    try {
      return path.basename(filePath);
    } catch (e) {
      console.error("Error getting filename from path:", filePath, e);
      return filePath; // Fallback to full path if path-browserify fails
    }
  };

  return (
    <div className="sub-job-modal-overlay">
      <div
        className="sub-job-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="sub-job-modal-close-btn">
          &times;
        </button>
        <form onSubmit={handleSubmit} className="sub-job-modal-form">
          <h2>Add Sub-Job for Invoice #{invoiceId}</h2>
          <div className="detail-note-due-container">
            <div className="form-group">
              <label htmlFor="subJobDetail">Sub-Job Detail:</label>
              <textarea
                id="subJobDetail"
                value={subJobDetail}
                onChange={(e) => setSubJobDetail(e.target.value)}
                rows={4}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="note">Note:</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="subJobDueDate">Due Date:</label>
              <input
                type="date"
                id="subJobDueDate"
                value={subJobDueDate}
                onChange={(e) => setSubJobDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Files:</label>
            {files.map((filePath, index) => (
              <div key={index} className="file-input-wrapper">
                <input
                  type="text"
                  value={filePath ? getFileName(filePath) : ""}
                  placeholder="No file chosen"
                  readOnly
                  className="file-path-display"
                />
                <button
                  type="button"
                  onClick={() => handleFileChange(index)}
                  className="browse-file-btn"
                >
                  Browse
                </button>
                {files.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="remove-file-btn"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddFile}
              className="add-file-btn"
            >
              + Add Another File
            </button>
          </div>

          <button type="submit">Add Component</button>
        </form>
      </div>
    </div>
  );
}

export default AddSubJobFormModal;
