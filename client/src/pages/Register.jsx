import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [redirect, setredirect] = useState(false);
  const [formData, setformData] = useState({
    name: '',
    email: '',
    userName: '',
    password: ''
  });

  const handleInput = (evt) => {
    setformData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const apiCall = async (evt) => {
     // showing alert
      const toastId = toast.loading("Processing...!");
    evt.preventDefault();
    const response = await axios.post('http://localhost:3000/api/users/user-registration', formData, { withCredentials: true });
    if (response?.data.sucess) {
      setredirect(true);
      toast.dismiss(toastId);
     toast.success(response.data.message);
    }else {
       toast.dismiss(toastId);
       toast.error(response.data.message);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate('/');
    }
  }, [redirect]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side Image */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url('./public/images/register.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
        </div>
        
        {/* Right Side Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <form
            onSubmit={(evt) => apiCall(evt)}
            className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-xl p-8 rounded-2xl"
          >
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">Sign up to start connecting</p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <input
                  onChange={(evt) => handleInput(evt)}
                  value={formData.name}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  id="name"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-500"
                >
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  onChange={(evt) => handleInput(evt)}
                  value={formData.email}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                  name="email"
                  placeholder="Email Address"
                  type="email"
                  id="email"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-500"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group">
                <input
                  onChange={(evt) => handleInput(evt)}
                  value={formData.userName}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                  name="userName"
                  placeholder="Username"
                  type="text"
                  id="userName"
                />
                <label
                  htmlFor="userName"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-500"
                >
                  Username
                </label>
              </div>

              <div className="relative group">
                <input
                  onChange={(evt) => handleInput(evt)}
                  value={formData.password}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 peer placeholder-transparent"
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 px-1 bg-white text-sm text-gray-500 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-500"
                >
                  Password
                </label>
              </div>

              <button
                className="w-full h-12 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 flex items-center justify-center gap-2"
                type="submit"
              >
                <span>Sign Up</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors" to="/">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;