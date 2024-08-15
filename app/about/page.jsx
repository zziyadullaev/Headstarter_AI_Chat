// app/about/page.jsx

import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          Welcome to our web application! As guided by Master Shifu, we are dedicated to providing you with the best user experience possible. Our team is committed to building software that is both functional and easy to use.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Our mission, inspired by the wisdom of Master Shifu, is to create innovative solutions that meet the needs of our users. We strive for excellence in every project we undertake and are constantly seeking ways to improve and evolve.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Thank you for choosing our service. We look forward to helping you achieve your goals and providing you with a seamless experience.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
