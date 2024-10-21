import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import https from "../../axios";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    https.post('/auth/local/register', {
      username: formData.username,
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        console.log("Ro'yxatdan o'tish muvaffaqiyatli", response.data);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.jwt);
        navigate('/login');
      })
      .catch(error => {
        setError(error.response?.data?.error?.message || "Ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        console.error("Ro'yxatdan o'tish xatosi:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-gray-800 shadow-lg rounded-lg"
      >
        <h4 className="text-center text-3xl font-bold mb-6 text-white">Register</h4>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-300 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="email"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">
            Password
          </label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="password" 
            required
          />
        </div>
        <div className="mb-6">
          <button 
            type="submit" 
            className="w-full bg-pink-500 text-white text-lg py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'REGISTER'}
          </button>
        </div>
        <p className="text-center text-gray-400">
          Already a member?
          <Link className="ml-2 text-pink-500 hover:text-pink-400" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;