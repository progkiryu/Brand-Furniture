// EditSubJobFormModal.tsx
import React, { useState, useEffect } from 'react';

interface EditSubJobFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    subJobToEdit: SubJob | null; // The subJob object to be edited
    onUpdateSubJob: (subJobId: string, updatedData: SubJob) => void;
    onDeleteSubJob: (subJobId: string) => void;
}

function EditSubJobFormModal({ isOpen, onClose, subJobToEdit, onUpdateSubJob, onDeleteSubJob }: EditSubJobFormModalProps) {
    const [subJobDetail, setSubJobDetail] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [status, setStatus] = useState<string>('Unassigned');
    const [frameFormed, setFrameFormed] = useState<boolean>(false);

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
            setStatus(subJobToEdit.status?.toString() || 'Unassigned');
            setFrameFormed(!!subJobToEdit.frameFormed); 
        } else if (!isOpen) {
            // Reset form fields when modal closes
            setSubJobDetail('');
            setNote('');
            setFile('');
            setDueDate('');
            setStatus('Unassigned');
            setFrameFormed(false);
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
            status: status,
            frameFormed: frameFormed,
            frameList: subJobToEdit.frameList, // Preserve existing lists
            cushionList: subJobToEdit.cushionList,
            upholsteryList: subJobToEdit.upholsteryList,
        };

        onUpdateSubJob(subJobToEdit._id.toString(), updatedData);
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
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Edit Sub-Job: {subJobToEdit?.subJobDetail}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="subJobDetail">Component Detail:</label>
                        <input
                            type="text"
                            id="subJobDetail"
                            value={subJobDetail}
                            onChange={(e) => setSubJobDetail(e.target.value)}
                            required
                        />
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
                    <div className="form-group">
                        <label htmlFor="status">Status:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Upholstery Cut">Upholstery Cut</option>
                            <option value="Body Upholstered">Body Upholstered</option>
                            <option value="Waiting for wrapping">Waiting for wrapping</option>
                            <option value="Frame Foamed">Frame Foamed</option>
                            <option value="In Production">In Production</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="frameFormed">Frame Formed:</label>
                        <input
                            type="checkbox"
                            id="frameFormed"
                            checked={frameFormed}
                            onChange={(e) => setFrameFormed(e.target.checked)}
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
