import React from 'react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="bg-[#2ABBB6] text-white px-4 py-3 rounded-t-lg">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="bg-gray-50 px-4 py-3 rounded-b-lg text-right">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
