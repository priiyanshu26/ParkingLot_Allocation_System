
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5174/api/User', {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Failed to fetch users:', err));
  }, []);

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
        className="card shadow-lg text-white w-100 position-relative"
        style={{
          maxWidth: '700px',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        {/* Back Button - top-right */}
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-4"
          onClick={() => navigate('/admin/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        <div className="text-center mb-4">
          <i className="bi bi-people-fill text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>ALL REGISTERED USERS</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Explore all users in the system</p>
        </div>

        {users.length === 0 ? (
          <p className="text-center text-warning" style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)' }}>No users found.</p>
        ) : (
          <div className="row g-4">
            {users.map((user) => (
              <div className="col-md-6" key={user.id}>
                <div
                  className="card bg-dark text-white h-100 shadow-sm border border-light"
                  style={{ borderRadius: '1rem' }}
                >
                  <div className="card-body">
                    <h4 className="card-title mb-3" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
                      <i className="bi bi-person-circle me-2 text-info"></i>
                      <span className="fw-bold">{user.username}</span>
                    </h4>
                    <p className="card-text" style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>
                      <strong>ID:</strong>{' '}
                      <span className="fw-semibold">{user.id}</span>
                    </p>
                    <p className="card-text" style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>
                      <strong>Role:</strong>{' '}
                      <span className="badge bg-primary px-3 py-2" style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.95rem)' }}>
                        {user.role}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllUsers;
