import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostNote from './NoteModal';
import './NoteModal.css'

function NoteModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className='createANoteButtonForModalMain'>
            <button onClick={() => setShowModal(true)} className='createANoteButtonForModal'>Create A Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostNote hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
        </>
    );
}

export default NoteModal;
