import React, { useState } from 'react';

interface NewSubJobDataForAdd {
    subJobId: string;
    jobDetail: string;
    file: string;
    note: string;
}

interface AddSubJobFormModalProps {
    testString: string;
    isOpen: boolean;
    onSubJobModalClose: () => void;
}

function AddSubJobFormModal({testString, isOpen, onSubJobModalClose}:AddSubJobFormModalProps) {
    const [jobDetail, setJobDetail] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [note, setNote] = useState<string>('');

    if (!isOpen) return null; 
    // const handleSubJobFormSubmit = (event: React.FormEvent) => {
    //     event.preventDefault(); // Prevents the browser's default form submission (page reload)

    //     // Basic validation
    //     if (!jobDetail || !file || !note) {
    //         alert('Please fill in all fields.');
    //         return;
    //     }

    //     // Generate a unique jobId for the new entry
    //     const newUniqueSubJobId = crypto.randomUUID();

    //     const newSubJob = {
    //         subJobId: newUniqueSubJobId,
    //         jobDetail: jobDetail, 
    //         file: file,
    //         note: note,
    //     };
    //     setJobDetail('');
    //     setFile('');
    //     setNote('');
    // };
    return (<>
        <div className="modal-overlay" onClick={onSubJobModalClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onSubJobModalClose} className="modal-close-btn">&times;</button>
                <div className="form-group">
                    <p>{testString}</p>
                </div>


            </div>
        </div>

    </>)
}

export default AddSubJobFormModal;