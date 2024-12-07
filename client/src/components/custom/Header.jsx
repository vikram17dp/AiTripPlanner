import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { AppContext } from "../../context/AppContext";

const Header = () => {
  const { userData, setToken, setUserData } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    setToken(false);
    setUserData(false);
    localStorage.removeItem("token");
  };

  const handleProfileToggle = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <svg
              className="h-10 w-10 mr-3"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 5L4 35H36L20 5Z" fill="white" />
              <circle cx="20" cy="20" r="6" fill="#4C1D95" />
              <path d="M20 14V26M14 20H26" stroke="white" strokeWidth="2" />
            </svg>
            <NavLink to="/" className="cursor-pointer">
              <span className="text-2xl font-bold">AiTripPlanner</span>
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
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg">
                    

                    <NavLink
                      to="/my-profile"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      MyProfile
                    </NavLink>
                    <NavLink
                      to="/my-trip"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      MyTrips
                    </NavLink>
                    <NavLink
                      to="/create-trip"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      CreateTrip
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full px-6 py-2 text-left text-red-500 hover:bg-gray-100"
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
              className="focus:outline-none"
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
                  ? "text-purple-200 font-bold transition"
                  : "text-white hover:text-purple-200 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/create-trip"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-200 font-bold transition"
                  : "text-white hover:text-purple-200 transition"
              }
            >
              Plan Trip
            </NavLink>
            <NavLink
              to="/aboutpage"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-200 font-bold transition"
                  : "text-white hover:text-purple-200 transition"
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
                  <span className="ml-2 w-full">{userData.name}</span>
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg">
                    
                    <NavLink
                      to="/my-profile"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      MyProfile
                    </NavLink>
                    <NavLink
                      to="/my-trip"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      MyTrips
                    </NavLink>
                    <NavLink
                      to="/create-trip"
                      className="block px-6 py-2 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      CreateTrip
                    </NavLink>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block px-6 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/signup">
                  <Button variant="secondary" className="mr-4">
                    Sign Up
                  </Button>
                </NavLink>
                <NavLink to="/signin">
                  <Button
                    variant="outline"
                    className="bg-white text-purple-600 hover:bg-purple-100"
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
          <nav className="md:hidden mt-4 bg-white text-gray-800 rounded-lg shadow-lg">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/create-trip"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Plan Trip
            </NavLink>
            <NavLink
              to="/aboutpage"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              About
            </NavLink>
            <div className="border-t mt-2">
              {!userData && (
                <>
                  <NavLink to="/signup">
                    <Button
                      variant="secondary"
                      className="block w-full px-4 py-2 text-center bg-slate-500 text-white mt-2 hover:bg-purple-600"
                    >
                      Sign Up
                    </Button>
                  </NavLink>
                  <NavLink to="/signin">
                    <Button
                      variant="outline"
                      className="block w-full px-4 py-2 text-center bg-slate-500 text-white mt-2 hover:bg-purple-600"
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
