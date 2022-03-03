import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostNote from './LeaveNote';
import './LeaveNote.css'

function LeaveNoteModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)} className='leave-review'>  Add a Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostNote hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default LeaveNoteModal;
