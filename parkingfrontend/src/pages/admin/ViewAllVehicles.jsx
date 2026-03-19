


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewAllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 4; // Adjust as needed
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5174/api/Vehicle', {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setVehicles(res.data))
      .catch((err) => console.error('Failed to fetch vehicles:', err));
  }, []);

  // Pagination Logic
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicles = vehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);
  const totalPages = Math.ceil(vehicles.length / vehiclesPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
          maxWidth: '1100px',
          width: '95%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: 'none',
          padding: '4rem 5rem',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-4"
          onClick={() => navigate('/admin/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <i className="bi bi-truck-front display-5 text-light"></i>
          <h2 className="fw-bold mt-3 fs-1">ALL REGISTERED VEHICLE</h2>
          <p className="text-secondary fs-3">Here are all the vehicles in the system</p>
        </div>

        {/* Vehicle List - Horizontal Box Format */}
        <div className="row">
          {currentVehicles.map((vehicle) => (
            <div key={vehicle.vehicleId} className="col-12 mb-4">
              <div
                className="d-flex flex-wrap justify-content-between align-items-start p-4 rounded border border-light text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  fontSize: '1.15rem',
                  lineHeight: '1.6',
                }}
              >
                <div className="me-4">
                  <strong>ID:</strong> {vehicle.vehicleId}
                </div>
                <div className="me-4">
                  <strong>Plate:</strong> {vehicle.numberPlate}
                </div>
                <div className="me-4">
                  <strong>Type:</strong> {vehicle.type}
                </div>
                <div className="me-4">
                  <strong>Model:</strong> {vehicle.model}
                </div>
                <div className="me-4">
                  <strong>Color:</strong> {vehicle.color}
                </div>
                <div>
                  <strong>User ID:</strong> {vehicle.userId}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination pagination-lg">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, idx) => (
                <li
                  key={idx + 1}
                  className={`page-item ${currentPage === idx + 1 && 'active'}`}
                >
                  <button className="page-link" onClick={() => goToPage(idx + 1)}>
                    {idx + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ViewAllVehicles;
