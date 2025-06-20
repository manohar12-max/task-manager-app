import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      toast.error("Login Failed");
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50 px-4 py-12">
      <div className="w-full md:w-1/2 max-w-md bg-white shadow-xl rounded-2xl p-8 md:p-10 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Login
        </h2>
        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="/preview.jpg"
          alt="Task Manager Preview"
          className="hidden sm:block w-full max-w-sm rounded-xl shadow-lg border border-blue-200"
        />
      </div>
    </div>
  );
}

export default Login;
