import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock } from 'react-icons/fi';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../firebase.js';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { backendUrl, setToken, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/');
      } else {
        console.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error(error.response?.data?.message || 'Network error');
    }
  };

  const handleGoogleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { email, displayName, photoURL } = user;

      const response = await axios.post(`${backendUrl}/api/user/google`, {
        name: displayName,
        email,
        image: photoURL,
      });

      if (response.data.success) {
        setToken(response.data.token);
        setUserData(response.data.user);
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-500">Welcome Back!</h2>
          <p className="mt-2 text-center text-sm text-gray-400">Please log in to continue.</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm">
            <div className="flex items-center border border-gray-300 rounded px-3 py-2">
              <FiMail className="text-gray-500 mr-2" />
              <input
                id="email-address"
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
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              <span>Continue with Google</span>
            </button>
          </div>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
