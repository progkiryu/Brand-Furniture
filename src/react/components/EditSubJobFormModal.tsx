// EditSubJobFormModal.tsx
import React, { useState, useEffect } from 'react';

interface EditSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    subJobToEdit: SubJob | null; // The subJob object to be edited
    onUpdateSubJob: (updatedData: SubJob) => void;
    onDeleteSubJob: (subJobId: string) => void;
}

function EditSubJobFormModal({ isOpen, onClose, subJobToEdit, onUpdateSubJob, onDeleteSubJob }: EditSubJobFormModalProps) {
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');

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
        if (isNaN(date.getTime())) return '';
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Effect to populate form fields when subJobToEdit changes or modal opens
    useEffect(() => {
        if (isOpen && subJobToEdit) {
            setSubJobDetail(subJobToEdit.subJobDetail?.toString() || '');
            setNote(subJobToEdit.note?.toString() || '');
            setFile(subJobToEdit.file?.toString() || '');
            setDueDate(formatDateForInput(subJobToEdit.dueDate));
        } else if (!isOpen) {
            // Reset form fields when modal closes
            setSubJobDetail('');
            setNote('');
            setFile('');
            setDueDate('');
        }
    }, [isOpen, subJobToEdit]);

    if (!isOpen) return null;

    /**
     * Handles the form submission for updating a sub-job.
     * @param event The form submission event.
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!subJobToEdit?._id) {
            console.error("SubJob ID is missing for update.");
            return;
        }

        const updatedData: SubJob = {
            _id: subJobToEdit._id,
            jobId: subJobToEdit.jobId, // Preserve existing jobId
            subJobDetail: subJobDetail,
            note: note,
            file: file,
            dueDate: dueDate ? new Date(dueDate) : undefined,
            frameList: subJobToEdit.frameList, // Preserve existing lists
            cushionList: subJobToEdit.cushionList,
            upholsteryList: subJobToEdit.upholsteryList,
        };

        onUpdateSubJob(updatedData);
        onClose();
    };

    /**
     * Handles the deletion of a sub-job.
     */
    const handleDelete = () => {
        if (subJobToEdit?._id) {
            onDeleteSubJob(subJobToEdit._id.toString());
            onClose();
        } else {
            console.error("SubJob ID is missing for deletion.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Edit Sub-Job: {subJobToEdit?.subJobDetail}</h2>
                    <div className="form-group">
                        <label htmlFor="subJobDetail">Component Detail:</label>
                        <textarea
                            id="subJobDetail"
                            value={subJobDetail}
                            onChange={(e) => setSubJobDetail(e.target.value)}
                            rows={4}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="note">Note:</label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows={2}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file">File:</label>
                        <input
                            type="text"
                            id="file"
                            value={file}
                            onChange={(e) => setFile(e.target.value)}
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
                    <button type="submit">Update Sub-Job</button>
                    <button id="delete-button" type="button" onClick={handleDelete}>Delete Sub-Job</button>
                </form>
            </div>
        </div>
    );
}

export default EditSubJobFormModal;
