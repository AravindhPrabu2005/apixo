import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/login`, {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.userId);
      window.location.href = '/home';
    } catch (error) {
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0b1622] to-[#12372A] flex items-center justify-center px-4">
      <div className="bg-[#111827] text-white w-full max-w-md p-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-8">
          <span className="text-green-500">Welcome</span> back!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Your e-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1f2937] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1f2937] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Log in
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{' '}
          <a href="/signup" className="text-green-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}
