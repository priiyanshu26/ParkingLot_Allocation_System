// import React, { useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../../utils/auth';

// const AllocateById = () => {
//   const [allocationId, setAllocationId] = useState('');
//   const [allocationDetails, setAllocationDetails] = useState(null);
//   const [message, setMessage] = useState('');

//   const fetchAllocationById = async () => {
//     if (!allocationId) {
//       alert('Please enter an Allocation ID');
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `http://localhost:5174/api/parkingallocation/${allocationId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//       setAllocationDetails(response.data);
//       setMessage('');
//     } catch (error) {
//       console.error('Error fetching allocation:', error);
//       setAllocationDetails(null);
//       setMessage('Allocation not found.');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Get Allocation by ID</h3>

//       <div className="row mb-3">
//         <div className="col-md-4">
//           <label>Allocation ID:</label>
//           <input
//             type="number"
//             className="form-control"
//             value={allocationId}
//             onChange={(e) => setAllocationId(e.target.value)}
//           />
//         </div>
//         <div className="col-md-2 d-flex align-items-end">
//           <button className="btn btn-info w-100" onClick={fetchAllocationById}>
//             Get Details
//           </button>
//         </div>
//       </div>

//       {message && <div className="alert alert-warning">{message}</div>}

//       {allocationDetails && (
//         <div className="mt-4">
//           <h5>Allocation Details</h5>
//           <ul className="list-group">
//             <li className="list-group-item">
//               Allocation ID: {allocationDetails.allocationId}
//             </li>
//             <li className="list-group-item">
//               User ID: {allocationDetails.userId}
//             </li>
//             <li className="list-group-item">
//               Vehicle ID: {allocationDetails.vehicleId}
//             </li>
//             <li className="list-group-item">
//               Parking Space ID: {allocationDetails.parkingSpaceId}
//             </li>
//             <li className="list-group-item">
//               From Date: {allocationDetails.fromDate}
//             </li>
//             <li className="list-group-item">
//               To Date: {allocationDetails.toDate}
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllocateById;



import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AllocateById = () => {
  const [allocationId, setAllocationId] = useState('');
  const [allocationDetails, setAllocationDetails] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const fetchAllocationById = async () => {
    if (!allocationId) {
      setMessage('Please enter an Allocation ID');
      setAllocationDetails(null);
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5174/api/parkingallocation/${allocationId}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setAllocationDetails(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching allocation:', error);
      setAllocationDetails(null);
      setMessage('Allocation not found.');
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
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-4"
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <i className="bi bi-search text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>SEARCH ALLOCATION</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter the Allocation ID below</p>
        </div>

        {/* Input Section */}
        <div className="row mb-4">
          <div className="col-md-8">
            <input
              type="number"
              className="form-control"
              placeholder="Enter Allocation ID"
              value={allocationId}
              onChange={(e) => setAllocationId(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button className="btn btn-info py-2 w-100" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={fetchAllocationById}>
              <i className="bi bi-check-circle me-2"></i>Get Details
            </button>
          </div>
        </div>

        {/* Message */}
        {message && <div className="alert alert-warning text-center" style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>{message}</div>}

        {/* Result Section */}
        {allocationDetails && (
          <div
            className="p-4 rounded border border-light text-white"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}
          >
            <h4 className="mb-3 text-info">
              <i className="bi bi-info-circle me-2"></i>Allocation Details
            </h4>
            <p><strong>Allocation ID:</strong> {allocationDetails.allocationId}</p>
            <p><strong>User ID:</strong> {allocationDetails.userId}</p>
            <p><strong>Vehicle ID:</strong> {allocationDetails.vehicleId}</p>
            <p><strong>Parking Space ID:</strong> {allocationDetails.parkingSpaceId}</p>
            <p><strong>From Date:</strong> {allocationDetails.fromDate}</p>
            <p><strong>To Date:</strong> {allocationDetails.toDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllocateById;
