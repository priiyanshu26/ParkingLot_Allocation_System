import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewAllAllocations = () => {
  const [allocations, setAllocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5174/api/ParkingAllocation', {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setAllocations(res.data || []))
      .catch((err) => {
        console.error('Failed to fetch allocations:', err);
        setAllocations([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(allocations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedAllocations = allocations.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
        className="card shadow-lg text-white position-relative w-100"
        style={{
          maxWidth: '1500px',
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
          <i className="bi bi-calendar2-check display-5 text-light"></i>
          <h1 className="fw-bold mt-3 fs-1">ALL PARKING ALLOCATIONS</h1>
          <p className="text-secondary fs-3">Review all current parking allocations</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-secondary mt-3 fs-5">Loading allocations...</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="table-responsive">
              <table className="table table-dark table-striped table-hover fs-5">
                <thead className="table-light text-center text-dark">
                  <tr>
                    <th>Allocation ID</th>
                    <th>Parking Space ID</th>
                    <th>User ID</th>
                    <th>Vehicle ID</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedAllocations.length > 0 ? (
                    paginatedAllocations.map((a) => (
                      <tr key={a.allocationId} className="text-center align-middle">
                        <td>{a.allocationId}</td>
                        <td>{a.parkingSpaceId}</td>
                        <td>{a.userId}</td>
                        <td>{a.vehicleId}</td>
                        <td>{a.fromDate}</td>
                        <td>{a.toDate}</td>
                        <td>{a.isActive ? 'Yes' : 'No'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted fs-5 py-3">
                        No allocations available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Info */}
            {allocations.length > 0 && (
              <div className="text-center mt-4">
                <p className="text-secondary mb-3" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1rem)' }}>
                  Showing {startIndex + 1} to {Math.min(endIndex, allocations.length)} of {allocations.length} allocations
                </p>

                {/* Pagination Controls */}
                <nav aria-label="Page navigation" className="d-flex justify-content-center">
                  <ul className="pagination pagination-sm flex-wrap gap-2">
                    {/* Previous Button */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link bg-secondary border-secondary text-dark fw-bold"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}
                      >
                        <i className="bi bi-chevron-left me-1"></i>Previous
                      </button>
                    </li>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <button
                          className={`page-link ${currentPage === page ? 'bg-success border-success' : 'bg-secondary border-secondary text-light'}`}
                          onClick={() => handlePageClick(page)}
                          style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    {/* Next Button */}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link bg-secondary border-secondary text-dark fw-bold"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}
                      >
                        Next<i className="bi bi-chevron-right ms-1"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAllAllocations;
