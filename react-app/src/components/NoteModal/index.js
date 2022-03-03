import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostNoteModal from './NoteModal';
import './NoteModal.css'

function NoteModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
        <div className='createANoteButtonForModalMain'>
            <button onClick={() => setShowModal(true)} className='createANoteButtonForModal'>Create A Note</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostNoteModal hideForm={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
        </>
    );
}

export default NoteModal;
