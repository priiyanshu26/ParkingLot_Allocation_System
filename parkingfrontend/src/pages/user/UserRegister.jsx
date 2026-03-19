


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setFeedback({ type: 'warning', text: 'Username and password are required.' });
      return;
    }

    if (trimmedUsername.length < 3) {
      setFeedback({ type: 'warning', text: 'Username must be at least 3 characters.' });
      return;
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(trimmedUsername)) {
      setFeedback({ type: 'warning', text: 'Username can contain only letters, numbers, underscore, dot and hyphen.' });
      return;
    }

    if (trimmedPassword.length < 6) {
      setFeedback({ type: 'warning', text: 'Password must be at least 6 characters.' });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:5174/register', {
        userName: trimmedUsername,
        password: trimmedPassword,
      });

      setFeedback({ type: 'success', text: 'Registration successful! Redirecting to login...' });
      setTimeout(() => navigate('/user/login'), 900);
    } catch (error) {
      const statusCode = error?.response?.status;
      const apiMessage = error?.response?.data?.message || error?.response?.data || '';
      const normalizedMessage = typeof apiMessage === 'string' ? apiMessage : 'Registration failed. Please try again.';
      const lowerMessage = normalizedMessage.toLowerCase();

      if (
        statusCode === 409 ||
        lowerMessage.includes('already exists') ||
        lowerMessage.includes('already registered') ||
        lowerMessage.includes('duplicate')
      ) {
        setFeedback({ type: 'warning', text: 'Username already exists. Please choose a different username.' });
      } else {
        setFeedback({ type: 'danger', text: normalizedMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `url('https://png.pngtree.com/background/20230425/original/pngtree-parking-lot-full-of-parked-vehicles-picture-image_2471799.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="card shadow-lg text-white"
        style={{
          maxWidth: '480px',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: 'none',
          padding: `clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)`,
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-person-plus-fill text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>USER REGISTRATION</h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Create your account to get started</p>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="form-control"
            value={username}
            maxLength={50}
            onChange={(e) => {
              setUsername(e.target.value);
              if (feedback.text) setFeedback({ type: '', text: '' });
            }}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            maxLength={100}
            onChange={(e) => {
              setPassword(e.target.value);
              if (feedback.text) setFeedback({ type: '', text: '' });
            }}
          />
        </div>

        {feedback.text && (
          <div className={`alert alert-${feedback.type} py-2`} role="alert" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>
            {feedback.text}
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between gap-2">
          <button
            className="btn btn-outline-light py-2"
            onClick={() => navigate('/')}
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
          <button
            className="btn btn-success py-2"
            onClick={handleRegister}
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            disabled={isLoading}
          >
            <i className="bi bi-person-check-fill me-2"></i>{isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
