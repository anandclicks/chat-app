import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [redirect, setredirect] = useState(false);
  const [formData, setformData] = useState({
    userName: '',
    password: ''
  });

  const handleInput = (evt) => {
    setformData((prev) => ({ ...prev, [evt.target.name]: evt.target.value }));
  };

  const apiCall = async (evt) => {
    evt.preventDefault();
    const response = await axios.post("http://localhost:3000/api/users/user-login", formData, { withCredentials: true });
    console.log(response);
    if (response?.data.sucess) {
      setredirect(true);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (redirect) {
      navigate('/chat');
    }
  }, [redirect]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-3xl shadow-2xl overflow-hidden bg-white">
        {/* Left Side Image */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/two-young-asian-female-friends-are-scrolling-their-smartphone-while-sitting-cafe-together_660230-84444.jpg')" }}
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
                Welcome Back
              </h1>
              <p className="text-gray-500 text-sm">Sign in to continue your journey</p>
            </div>

            <div className="space-y-6">
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
                <span>Log In</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <Link className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors" to="/register">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;