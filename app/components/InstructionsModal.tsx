import React from 'react';
import Modal from 'react-modal';

const InstructionsModal = ({ isOpen, onRequestClose }: {
  isOpen: boolean; onRequestClose: () => void;
}) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '0.5rem',
      backgroundColor: '#222',
      border: 'none',
      boxShadow: '0 0 1rem 0 rgba(255, 255, 255, 0.2)',
      maxHeight: '90vh',
      maxWidth: '95vw',
      zIndex: 20, // Add a higher z-index value for the modal
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Instructions"
    >
      <div className='max-w-xl mx-auto justify-center p-3 '>
        <div className='flex justify-between items-center'>
          <h2>Instructions</h2>
          <button className="close-button" onClick={onRequestClose}>✕</button>
        </div>
        <h4 className='text-slate-300 text-base font-normal'>In each question, you will very briefly be shown an image. <br /><br />
          <b>If the image contains an animal</b>, press the left arrow
          <span className='keyboard-key m-1.5'>←</span>
          on your keyboard. If the image does not contain an animal, press the
          <span className='keyboard-key m-1.5'>→</span>
          right arrow.<br /><br />
          Each image will be displayed for <b>only 20 milliseconds</b> (a fiftieth of a second), so please keep your eyes on the screen.
          <br /><br />
          It is recommended that you complete this test on a computer with a keyboard in a focused environment in order to see the images and record your responses correctly.
          <br />
        </h4>
        <p className='text-xs leading-none mt-2 text-slate-500'>On mobile devices and screens with low refresh rates, the test may not work as intended owing to the extremely brief display times.</p>
      </div>
    </Modal>
  );
};

export default InstructionsModal;