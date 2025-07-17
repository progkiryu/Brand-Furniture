// src/components/AddFrameFormModal.tsx
import React, { useState, useEffect } from 'react';

// Replicate Frame type from types.d.ts for local use (using String for strings)
export type FrameForCreation = {
    subJobId?: String; // Will be passed from parent, but optional for creation DTO
    supplier?: String;
    description?: String;
    orderedDate?: Date;
    expectedDate?: Date;
    receivedDate?: Date;
};

interface AddFrameFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    subJobId: string; // Primitive string, will convert to String object for backend
    subJobDetail: string; // For display in modal title
    onAddFrame: (newFrameData: Frame) => void;
}

function AddFrameFormModal({ isOpen, onClose, subJobId, subJobDetail, onAddFrame }: AddFrameFormModalProps) {
    const [supplier, setSupplier] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [orderedDate, setOrderedDate] = useState<string>('');
    const [expectedDate, setExpectedDate] = useState<string>('');
    const [receivedDate, setReceivedDate] = useState<string>('');


    // Reset form fields when modal opens/closes or subJobId changes
    useEffect(() => {
        if (!isOpen) {
            setSupplier('');
            setDescription('');
            setOrderedDate('');
            setExpectedDate('');
            setReceivedDate('');
        }
    }, [isOpen, subJobId]); // Add subJobId to dependencies to reset when context changes

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        // Validate at least one non-date field is filled
        if (!supplier.trim() && !description.trim()) {
            alert('Please fill in at least the Supplier or Description field.');
            return;
        }

        const newFrameData: Frame = {
            subJobId: subJobId, // Convert primitive string to String object
            supplier: supplier ? supplier : undefined,
            description: description ? description : undefined,
            orderedDate: orderedDate ? new Date(orderedDate) : undefined,
            expectedDate: expectedDate ? new Date(expectedDate) : undefined,
            receivedDate: receivedDate ? new Date(receivedDate) : undefined,
        };

        onAddFrame(newFrameData);
        onClose(); // Close modal on successful submission
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-btn">&times;</button>
                <form onSubmit={handleSubmit} className="modal-form">
                    <h2>Add Frame for Sub-Job: {subJobDetail}</h2>

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

                    <button type="submit">Add Frame</button>
                </form>
            </div>
        </div>
    );
}

export default AddFrameFormModal;