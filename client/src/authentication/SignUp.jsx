import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        toast.success('Sign up successful!');
        navigate('/signin');
      } else {
        console.error(response.data.message || 'Sign up failed.');
        toast.error('Sign up failed');
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Network error');
      toast.error('Network error');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">Sign up for an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          <div className="rounded-md shadow-sm">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FiUser className="text-gray-500 mr-2" />
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded w-full py-1 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Full Name"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-4">
              <FiMail className="text-gray-500 mr-2" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded w-full py-1 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded px-3 py-2 mt-4">
              <FiLock className="text-gray-500 mr-2" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded w-full py-1 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Sign up
            </button>
          </div>
        </form>

     

        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
