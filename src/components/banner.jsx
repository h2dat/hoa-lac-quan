
import React from 'react';
import '../Modal.css'; 
const Modal = ({ isOpen, onClose, imageUrl }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={imageUrl} alt="Modal" height={500} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 10 }}/>
            <button className="modal-close" onClick={onClose}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;