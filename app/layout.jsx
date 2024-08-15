"use client";

import React from 'react';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import './globals.css'; // Ensure Tailwind CSS is included globally

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Headstarter</title>
        <meta name="description" content="Headstarter - Next.js and Firebase app" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-100 min-h-screen">
        <AuthContextProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
