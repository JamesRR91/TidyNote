import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostNote from './NoteModal';
import './NoteModal.css'

function NoteModal() {
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

export default NoteModal;
