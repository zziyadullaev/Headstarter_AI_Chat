// app/components/AuthModal.jsx

"use client";

import React from 'react';
import { UserAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      onClose(); // Close the modal after successful login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-6 text-center">Sign In</h2>
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-2 mb-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
        <button
          onClick={onClose}
          className="w-full py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
