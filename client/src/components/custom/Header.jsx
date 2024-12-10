import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from 'lucide-react';
import { AppContext } from "../../context/AppContext";
import { toast } from "sonner"

const Header = () => {
  const { userData, setToken, setUserData } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUserData(null);
    navigate('/signin'); 
    toast.success("Logout successful!")
  };

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="cursor-pointer">
              <img
                className="h-12 w-auto mr-3 object-contain transition-transform duration-300 hover:scale-105" 
                src="/logo1.png"  
                alt="AiTripPlanner Logo"
              />
            </NavLink>
          </div>

          {/* Mobile Header Items */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Profile Picture & Menu (Mobile Version) */}
            {userData && (
              <div className="relative">
                <button onClick={handleProfileToggle}>
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <NavLink
                      to="/my-profile"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/my-trips"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Trips
                    </NavLink>
                    <NavLink
                      to="/create-trip"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Create Trip
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition duration-150 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Mobile Menu Icon */}
            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className="focus:outline-none transition-transform duration-300 hover:scale-110"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold transition duration-300"
                  : "text-white hover:text-yellow-300 transition duration-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create-trip"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold transition duration-300"
                  : "text-white hover:text-yellow-300 transition duration-300"
              }
            >
              Plan Trip
            </NavLink>
            {userData && (
              <Link
                to="https://techy-blog.onrender.com/"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Traveling Blog
              </Link>
            )}
            <NavLink
              to="/aboutpage"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-300 font-bold transition duration-300"
                  : "text-white hover:text-yellow-300 transition duration-300"
              }
            >
              About
            </NavLink>
          </nav>

          {/* Desktop Profile Section */}
          <div className="hidden md:flex items-center">
            {userData ? (
              <div className="relative">
                <button
                  onClick={handleProfileToggle}
                  className="flex items-center space-x-2"
                >
                  <div className="flex items-center space-x-4 border border-white/30 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-sm">
                    <span className="font-semibold text-lg hover:text-yellow-300 transition duration-300">
                      {userData.name}
                    </span>
                  </div>
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl overflow-hidden">
                    <NavLink
                      to="/my-profile"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/my-trips"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Trips
                    </NavLink>
                    <NavLink
                      to="/create-trip"
                      className="block px-4 py-2 hover:bg-indigo-100 transition duration-150 text-sm"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Create Trip
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full px-4 py-2 text-left text-red-500 hover:bg-red-100 transition duration-150 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/signup">
                  <Button variant="secondary" className="mr-4 bg-white text-indigo-600 hover:bg-yellow-300 hover:text-indigo-700 transition duration-300">
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to="/signin">
                  <Button
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 transition duration-300"
                  >
                    Sign In
                  </Button>
                </NavLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden mt-4 bg-white text-gray-800 rounded-lg shadow-xl">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
            >
              Home
            </NavLink>
            <NavLink
              to="/create-trip"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
            >
              Plan Trip
            </NavLink>
            {userData && (
              <Link
                to="https://techy-blog.onrender.com/"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
              >
                Traveling Blog
              </Link>
            )}
            <NavLink
              to="/aboutpage"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100 transition duration-150"
            >
              About
            </NavLink>
            <div className="border-t mt-2">
              {!userData && (
                <>
                  <NavLink to="/signup">
                    <Button
                      variant="secondary"
                      className="block w-full px-4 py-2 text-center bg-indigo-600 text-white mt-2 hover:bg-indigo-700 transition duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </NavLink>
                  <NavLink to="/signin">
                    <Button
                      variant="outline"
                      className="block w-full px-4 py-2 text-center bg-transparent border border-indigo-600 text-indigo-600 mt-2 hover:bg-indigo-600 hover:text-white transition duration-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

