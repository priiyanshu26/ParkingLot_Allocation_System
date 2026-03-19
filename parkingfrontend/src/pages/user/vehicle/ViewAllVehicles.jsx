import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewAllVehicles = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [loadingVehicles, setLoadingVehicles] = useState(true);
  const [errorVehicles, setErrorVehicles] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  const fetchAllVehicles = async () => {
    setLoadingVehicles(true);
    setErrorVehicles(null);
    try {
      const res = await axios.get('http://localhost:5174/api/vehicle/my-vehicles', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setAllVehicles(res.data || []);
    } catch (err) {
      setErrorVehicles('Failed to fetch vehicles. Please try again.');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoadingVehicles(false);
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
        className="card shadow-lg text-white position-relative"
        style={{
          maxWidth: '700px',
          width: '95%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: 'none',
          padding: 'clamp(1rem, 3vw, 2.5rem)',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-danger btn-sm position-absolute top-0 end-0 m-3 px-3 py-1"
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i>Back to Dashboard
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <i className="bi bi-car-front-fill text-light" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3.4rem)' }}>
            My Registered Vehicles
          </h2>
          <p className="text-secondary mb-0" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.4rem)' }}>
            View all your registered vehicles
          </p>
        </div>

        {/* Loading State */}
        {loadingVehicles && (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3" style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>Loading your vehicles...</p>
          </div>
        )}

        {/* Error State */}
        {errorVehicles && !loadingVehicles && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle me-2"></i>
            {errorVehicles}
          </div>
        )}

        {/* Vehicles Table */}
        {!loadingVehicles && allVehicles.length > 0 && (
          <div className="table-responsive">
            <table className="table table-dark table-striped table-hover">
              <thead className="table-light text-dark">
                <tr>
                  <th>Vehicle ID</th>
                  <th>Number Plate</th>
                  <th>Type</th>
                  <th>Model</th>
                  <th>Color</th>
                </tr>
              </thead>
              <tbody>
                {allVehicles.map((vehicle) => (
                  <tr key={vehicle.vehicleId} className="align-middle">
                    <td className="fw-semibold">{vehicle.vehicleId}</td>
                    <td className="fw-semibold text-success">{vehicle.numberPlate}</td>
                    <td>{vehicle.type || 'N/A'}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.color}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {!loadingVehicles && allVehicles.length === 0 && !errorVehicles && (
          <div className="alert alert-info mb-0">
            <i className="bi bi-info-circle me-2"></i>
            No vehicles registered yet. Start by registering a new vehicle.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllVehicles;
