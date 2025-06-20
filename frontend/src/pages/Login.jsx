import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name',res.data.user.name)
      toast.success("Login Successful")
      navigate('/');
    } catch (err) {
      toast.error("Login Failed")
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
