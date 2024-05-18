import React from 'react';
import '../Modal.css'; 

const Modal = ({ isOpen, onClose, imageUrls, customStyle }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose} style={customStyle}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-images">
              {imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Modal ${index}`} height={500} style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 10, margin: '0 10px' }} />
              ))}
            </div>
            <button className="modal-close" onClick={onClose}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
