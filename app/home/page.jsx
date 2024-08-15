// app/page.jsx

"use client";

import React, { useState } from 'react';
import AuthModal from '../components/AuthModal';
import { UserAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = UserAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      // Redirect to the chatbot if user is authenticated
      window.location.href = '/chat';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Headstarter</h1>
      <p className="text-lg text-gray-700 mb-8">Get started on your journey with us.</p>
      <button
        onClick={handleGetStarted}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </button>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
