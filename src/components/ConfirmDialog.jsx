import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-orange-100 p-2 rounded-full">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 btn-secondary"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 btn-success"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
