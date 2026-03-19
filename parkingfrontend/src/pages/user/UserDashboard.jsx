
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, removeUserData } from '../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState(null); // 'vehicle', 'parking', or 'allocation'
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUserData();
    setUserData(user);
  }, []);

  const handleLogout = () => {
    removeUserData();
    navigate('/');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 position-relative"
      style={{
        backgroundImage: `url('https://png.pngtree.com/background/20230425/original/pngtree-parking-lot-full-of-parked-vehicles-picture-image_2471799.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Profile button — fixed top-right, always visible outside the card */}
      <button
        type="button"
        className="btn btn-outline-light rounded-circle"
        onClick={() => setShowProfile(!showProfile)}
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.2rem',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          zIndex: 1100,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
        title="Profile"
      >
        <i className="bi bi-person-circle"></i>
      </button>

      {/* Profile panel — fixed right-side drawer, never overlaps the card */}
      {showProfile && userData && (
        <div
          className="card shadow-lg text-white"
          style={{
            position: 'fixed',
            top: '4.2rem',
            right: '1rem',
            width: '260px',
            backgroundColor: 'rgba(15, 15, 15, 0.97)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 1099,
          }}
        >
          <div className="card-header bg-dark border-bottom d-flex justify-content-between align-items-center"
            style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <span><i className="bi bi-person-fill me-2"></i>User Profile</span>
            <button
              type="button"
              className="btn-close btn-close-white btn-sm"
              onClick={() => setShowProfile(false)}
            />
          </div>
          <div className="card-body py-3">
            <div className="mb-2">
              <small className="text-secondary">Name</small>
              <p className="mb-0 fw-semibold">{userData.name || 'N/A'}</p>
            </div>
            <hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '0.5rem 0' }} />
            <div className="mb-2">
              <small className="text-secondary">User ID</small>
              <p className="mb-0 fw-semibold">{userData.userId || 'N/A'}</p>
            </div>
            <hr style={{ borderColor: 'rgba(255,255,255,0.15)', margin: '0.5rem 0' }} />
            <div>
              <small className="text-secondary">Role</small>
              <p className="mb-0 fw-semibold">{userData.role || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}

      <div
        className="card shadow-lg text-white position-relative"
        style={{
          maxWidth: '1100px',
          width: '95%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: 'none',
          padding: 'clamp(1rem, 3vw, 3rem)',
        }}
      >

        <div className="text-center mb-4">
          <i className="bi bi-person-circle text-light" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.4rem)' }}>USER DASHBOARD</h2>
          <p className="text-secondary mb-0" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.8rem)' }}>
            Manage your Vehicles, Parking & Allocations
          </p>
        </div>

        <div className="row text-center mb-4">
          {/* Vehicle Button */}
          <div className="col-md-4 mb-3">
            <button
              className="btn btn-outline-light fw-bold w-100"
              style={{
                height: 'clamp(110px, 18vw, 180px)',
                fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                padding: 'clamp(0.8rem, 1.6vw, 1.5rem)',
              }}
              onClick={() =>
                setActiveSection(
                  activeSection === 'vehicle' ? null : 'vehicle'
                )
              }
            >
              <i className="bi bi-car-front-fill me-2"></i>Vehicle
            </button>
          </div>

          {/* Parking Space + Back Button */}
          <div className="col-md-4 mb-3">
            <div
              className="d-flex flex-column justify-content-between"
              style={{ height: '180px' }}
            >
              <button
                className="btn btn-outline-light fw-bold w-100 text-nowrap"
                style={{
                  fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                  padding: 'clamp(0.8rem, 1.6vw, 1.5rem)',
                }}
                onClick={() =>
                  setActiveSection(
                    activeSection === 'parking' ? null : 'parking'
                  )
                }
              >
                <i className="bi bi-geo-alt-fill me-2"></i>Parking Space
              </button>
              <button
                className="btn btn-outline-danger fw-semibold w-100"
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                  padding: 'clamp(0.55rem, 1.2vw, 0.9rem)',
                }}
                onClick={handleLogout}
              >
                <i className="bi bi-arrow-left me-2"></i>Logout
              </button>
            </div>
          </div>

          {/* Allocation Button */}
          <div className="col-md-4 mb-3">
            <button
              className="btn btn-outline-light fw-bold w-100"
              style={{
                height: 'clamp(110px, 18vw, 180px)',
                fontSize: 'clamp(1.2rem, 2.4vw, 2rem)',
                padding: 'clamp(0.8rem, 1.6vw, 1.5rem)',
              }}
              onClick={() =>
                setActiveSection(
                  activeSection === 'allocation' ? null : 'allocation'
                )
              }
            >
              <i className="bi bi-diagram-3-fill me-2"></i>Allocation
            </button>
          </div>
        </div>

        {/* Vehicle Options */}
        {activeSection === 'vehicle' && (
          <div className="d-flex flex-column gap-3 mb-3">
            <button
              className="btn btn-outline-primary py-2 fs-5"
              onClick={() => navigate('/user/vehicle/view-all')}
            >
              <i className="bi bi-list-check me-2"></i>View All My Vehicles
            </button>
            <button
              className="btn btn-outline-success py-2 fs-5"
              onClick={() => navigate('/user/vehicle/register')}
            >
              <i className="bi bi-plus-circle me-2"></i>Register Vehicle
            </button>
            <button
              className="btn btn-outline-warning py-2 fs-5 text-white"
              onClick={() => navigate('/user/vehicle/update')}
            >
              <i className="bi bi-pencil-square me-2"></i>Update Vehicle
            </button>
            <button
              className="btn btn-outline-info py-2 fs-5 text-white"
              onClick={() => navigate('/user/vehicle/get')}
            >
              <i className="bi bi-search me-2"></i>Get Vehicle by ID
            </button>
            <button
              className="btn btn-outline-danger py-2 fs-5"
              onClick={() => navigate('/user/vehicle/delete')}
            >
              <i className="bi bi-trash-fill me-2"></i>Delete Vehicle
            </button>
          </div>
        )}

        {/* Parking Options */}
        {activeSection === 'parking' && (
          <div className="d-flex flex-column gap-3 mb-3">
            <button
              className="btn btn-outline-success py-2 fs-5"
              onClick={() => navigate('/user/parking/available')}
            >
              <i className="bi bi-check2-circle me-2"></i>Available Space
            </button>
            <button
              className="btn btn-outline-info py-2 fs-5 text-white"
              onClick={() => navigate('/user/parking/available-by-date')}
            >
              <i className="bi bi-calendar-range-fill me-2"></i>Available Space in Given Date
            </button>
          </div>
        )}

        {/* Allocation Options */}
        {activeSection === 'allocation' && (
          <div className="d-flex flex-column gap-3">
            <button
              className="btn btn-outline-primary py-2 fs-5"
              onClick={() => navigate('/user/allocation/allocate')}
            >
              <i className="bi bi-plus-square me-2"></i>Parking Allocation
            </button>
            <button
              className="btn btn-outline-secondary py-2 fs-5"
              onClick={() => navigate('/user/allocation/allocate-by-id')}
            >
              <i className="bi bi-search me-2"></i>Parking Allocation by ID
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
