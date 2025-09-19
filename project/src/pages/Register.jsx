import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {signup}=useContext(AuthContext)

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Registering:', { name, email, password });
    signup({name,email,password})
    // Simulate successful registration
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4" >Register</h2>

        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded mb-4">
          Register
        </button>

        <p className="text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
