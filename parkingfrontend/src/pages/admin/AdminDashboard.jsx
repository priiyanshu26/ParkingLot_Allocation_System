
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

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
        className="card shadow-lg text-white text-center position-relative"
        style={{
          maxWidth: '700px',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div className="mb-4">
          <i className="bi bi-speedometer2 text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)' }}>ADMIN DASHBOARD</h1>
          <p className="text-secondary mb-0" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)', letterSpacing: '0.05em' }}>MANAGES USERS , VEHICLES , ALLOCATIONS</p>
        </div>

        <div className="d-flex flex-column gap-3">
          <button
            className="btn btn-outline-light py-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/view-users')}
          >
            <i className="bi bi-people-fill me-2"></i>View All Users
          </button>

          <button
            className="btn btn-outline-danger py-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/delete-user')}
          >
            <i className="bi bi-person-dash-fill me-2"></i>Delete User
          </button>

          <button
            className="btn btn-outline-success py-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/view-vehicles')}
          >
            <i className="bi bi-truck-front-fill me-2"></i>View All Vehicles
          </button>

          <button
            className="btn btn-outline-danger py-2"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/delete-vehicle')}
          >
            <i className="bi bi-trash3-fill me-2"></i>Delete Vehicle
          </button>

          <button
            className="btn btn-outline-warning py-2 text-white"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/view-allocations')}
          >
            <i className="bi bi-list-check me-2"></i>View All Allocations
          </button>

          <button
            className="btn btn-outline-info py-2 text-white"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            onClick={() => navigate('/admin/parking-space')}
          >
            <i className="bi bi-map-fill me-2"></i>View Parking Space by ID
          </button>
        </div>

        {/* Logout Button */}
        <button
          className="btn btn-outline-secondary btn-sm position-absolute bottom-0 end-0 m-3"
          onClick={() => navigate('/')}
        >
          <i className="bi bi-arrow-left me-2"></i>Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
