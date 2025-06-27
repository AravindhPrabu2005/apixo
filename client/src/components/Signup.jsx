import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert(response.data.message);
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0b1622] to-[#12372A] flex items-center justify-center px-4">
      <div className="bg-[#111827] text-white w-full max-w-md p-10 rounded-2xl shadow-lg">
        <h1 className="text-center text-2xl font-semibold mb-8">
          <span className="text-green-500">Create</span> your account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm text-gray-300">Your name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[#1f2937] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
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
            Sign up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
