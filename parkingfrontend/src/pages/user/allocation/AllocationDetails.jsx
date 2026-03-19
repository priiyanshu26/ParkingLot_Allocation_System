import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AllocationDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const allocation = location.state?.allocation;

  const formatToLocalTime = (utcString) => {
    if (!utcString) return 'N/A';
    return new Date(utcString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        className="card shadow-lg text-white position-relative"
        style={{
          maxWidth: '700px',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.88)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-3"
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        <div className="text-center mb-4">
          <i className="bi bi-card-checklist text-info" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>
            ALLOCATION DETAILS
          </h1>
          <p className="text-secondary mb-0" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>
            Here are your parking allocation details
          </p>
        </div>

        {!allocation ? (
          <div className="alert alert-warning text-center mb-0">
            Allocation details not found. Please allocate parking again.
          </div>
        ) : (
          <ul className="list-group">
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>Allocation ID:</strong> {allocation.allocationId ?? 'N/A'}
            </li>
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>User ID:</strong> {allocation.userId ?? 'N/A'}
            </li>
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>Vehicle ID:</strong> {allocation.vehicleId ?? 'N/A'}
            </li>
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>Parking Space ID:</strong> {allocation.parkingSpaceId ?? 'N/A'}
            </li>
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>From:</strong> {formatToLocalTime(allocation.fromDate)}
            </li>
            <li className="list-group-item bg-dark text-white border-secondary">
              <strong>To:</strong> {formatToLocalTime(allocation.toDate)}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllocationDetails;