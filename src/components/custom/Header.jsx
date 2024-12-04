import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white">
     
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-10 w-10 mr-3"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 5L4 35H36L20 5Z" fill="white" />
              <circle cx="20" cy="20" r="6" fill="#4C1D95" />
              <path
                d="M20 14V26M14 20H26"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
            <span className="text-2xl font-bold">AiTripPlanner</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-purple-200 font-bold transition'
                  : 'text-white hover:text-purple-200 transition'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/plan"
              className={({ isActive }) =>
                isActive
                  ? 'text-purple-200 font-bold transition'
                  : 'text-white hover:text-purple-200 transition'
              }
            >
              Plan Trip
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-purple-200 font-bold transition'
                  : 'text-white hover:text-purple-200 transition'
              }
            >
              About
            </NavLink>
          </nav>
          <div className="flex items-center">
            <Button variant="secondary" className="mr-4 hidden sm:inline-flex">
              Sign Up
            </Button>
            <Button
              variant="outline"
              className="bg-white text-purple-600 hover:bg-purple-100"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
