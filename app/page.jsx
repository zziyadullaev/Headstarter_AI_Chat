// app/page.jsx

"use client";

import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import { UserAuth } from './context/AuthContext';

const HomePage = () => {
  const { user } = UserAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      setAuthModalOpen(true);
    } else {
      window.location.href = '/chat';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Headstarter</h1>
        <p className="text-lg mb-8">
          Start your journey with us and explore the best user experiences in web applications.
        </p>
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </button>
      </div>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
