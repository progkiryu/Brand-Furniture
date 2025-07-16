// EditUpholsteryFormModal.tsx
import React, { useState, useEffect } from 'react';

interface EditUpholsteryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    upholsteryToEdit: Upholstery | null; // The upholstery object to be edited
    onUpdateUpholstery: (updatedData: Upholstery) => void;
    onDeleteUpholstery: (upholsteryId: string) => void;
}

function EditUpholsteryFormModal({ isOpen, onClose, upholsteryToEdit, onUpdateUpholstery, onDeleteUpholstery }: EditUpholsteryFormModalProps) {
    const [type, setType] = useState<string>('');
    const [supplier, setSupplier] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [orderedDate, setOrderedDate] = useState<string>('');
    const [expectedDate, setExpectedDate] = useState<string>('');
    const [receivedDate, setReceivedDate] = useState<string>('');

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

    // Effect to populate form fields when upholsteryToEdit changes or modal opens
    useEffect(() => {
        if (isOpen && upholsteryToEdit) {
            setType(upholsteryToEdit.type?.toString() || '');
            setSupplier(upholsteryToEdit.supplier?.toString() || '');
            setDescription(upholsteryToEdit.description?.toString() || '');
            setOrderedDate(formatDateForInput(upholsteryToEdit.orderedDate));
            setExpectedDate(formatDateForInput(upholsteryToEdit.expectedDate));
            setReceivedDate(formatDateForInput(upholsteryToEdit.receivedDate));
        } else if (!isOpen) {
            // Reset form fields when modal closes
            setType('');
            setSupplier('');
            setDescription('');
            setOrderedDate('');
            setExpectedDate('');
            setReceivedDate('');
        }
    }, [isOpen, upholsteryToEdit]);

    if (!isOpen) return null;

    /**
     * Handles the form submission for updating upholstery.
     * @param event The form submission event.
     */
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!upholsteryToEdit?._id) {
            console.error("Upholstery ID is missing for update.");
            return;
        }

        // Validate 'type' field is filled (required)
        if (!type.trim()) {
            console.error('Please fill in the Type field.');
            return;
        }

        const updatedData: Upholstery = {
            _id: upholsteryToEdit._id,
            subJobId: upholsteryToEdit.subJobId, // Preserve existing subJobId
            type: type,
            supplier: supplier,
            description: description,
            orderedDate: orderedDate ? new Date(orderedDate) : undefined,
            expectedDate: expectedDate ? new Date(expectedDate) : undefined,
            receivedDate: receivedDate ? new Date(receivedDate) : undefined,
        };

        onUpdateUpholstery(updatedData);
        onClose();
    };

    /**
     * Handles the deletion of upholstery.
     */
    const handleDelete = () => {
        if (upholsteryToEdit?._id) {
            onDeleteUpholstery(upholsteryToEdit._id.toString());
            onClose();
        } else {
            console.error("Upholstery ID is missing for deletion.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Edit Upholstery: {upholsteryToEdit?.description || upholsteryToEdit?.type}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Type:</label>
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
                    <button type="submit">Update Upholstery</button>
                    <button id="delete-button" type="button" onClick={handleDelete}>Delete Upholstery</button>
                </form>
            </div>
        </div>
    );
}

export default EditUpholsteryFormModal;