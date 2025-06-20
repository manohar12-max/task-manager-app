import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (formData) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
}

export default Register;
