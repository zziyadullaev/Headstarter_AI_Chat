"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Profile', href: '/profile' },
    {
      text: user ? 'Sign Out' : 'Sign In',
      onClick: user ? logOut : googleSignIn,
    },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-600 cursor-pointer">
            Headstarter
          </span>
        </Link>
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item, index) =>
            item.href ? (
              <Link key={index} href={item.href}>
                <span className="px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer transition duration-200">
                  {item.text}
                </span>
              </Link>
            ) : (
              <button
                key={index}
                className="px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200"
                onClick={item.onClick}
              >
                {item.text}
              </button>
            )
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleDrawer}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {drawerOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-2">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  <Link href={item.href}>
                    <span
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer transition duration-200"
                      onClick={toggleDrawer}
                    >
                      {item.text}
                    </span>
                  </Link>
                ) : (
                  <button
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition duration-200"
                    onClick={() => {
                      item.onClick();
                      toggleDrawer();
                    }}
                  >
                    {item.text}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
