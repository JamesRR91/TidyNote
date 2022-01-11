import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

function SignupFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
          <button className='login-button' onClick={() => setShowModal(true)}>Sign Up</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <SignupForm />
            </Modal>
          )}
        </div>
      );
}

export default SignupFormModal;
