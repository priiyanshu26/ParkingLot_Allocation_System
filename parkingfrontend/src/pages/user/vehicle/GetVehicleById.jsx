// import React, { useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../../utils/auth';

// const GetVehicleById = () => {
//   const [id, setId] = useState('');
//   const [vehicle, setVehicle] = useState(null);

//   const handleFetch = async () => {
//     try {
//       const token = getToken();

//       const res = await axios.get(`http://localhost:5174/api/vehicle/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setVehicle(res.data);
//     } catch (err) {
//       alert('Vehicle not found');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Get Vehicle Details</h2>
//       <input
//         type="text"
//         placeholder="Vehicle ID"
//         className="form-control my-2"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//       />
//       <button className="btn btn-info" onClick={handleFetch}>Fetch</button>

//       {vehicle && (
//         <div className="mt-4">
//           <h4>Vehicle Info:</h4>
//           <pre>{JSON.stringify(vehicle, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetVehicleById;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const GetVehicleById = () => {
  const [id, setId] = useState('');
  const [vehicle, setVehicle] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleFetch = async () => {
    try {
      const token = getToken();

      const res = await axios.get(`http://localhost:5174/api/vehicle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setVehicle(res.data);
      setFeedback({ type: '', text: '' });
    } catch {
      setFeedback({ type: 'warning', text: 'Vehicle not found' });
      setVehicle(null);
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
          maxWidth: '520px',
          width: '90%',
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-search text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>GET VEHICLE BY ID</h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter the vehicle ID to fetch details</p>
        </div>

        {/* Vehicle ID Input */}
        <div className="mb-4">
          <label className="form-label text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Vehicle ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Vehicle ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        {feedback.text && (
          <div className={`alert alert-${feedback.type} py-2`} role="alert" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>
            {feedback.text}
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-3 mb-4 gap-2">
          <button
            className="btn btn-outline-secondary py-2"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            onClick={() => navigate('/user/dashboard')}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
          <button className="btn btn-info py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleFetch}>
            <i className="bi bi-search me-2"></i>Fetch
          </button>
        </div>

        {/* Vehicle Result Box */}
        {vehicle && (
          <div
            className="border rounded p-4 mt-3 text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}
          >
            <p><strong>Vehicle ID:</strong> {vehicle.vehicleId}</p>
            <p><strong>Number Plate:</strong> {vehicle.numberPlate}</p>
            <p><strong>Type:</strong> {vehicle.type}</p>
            <p><strong>Model:</strong> {vehicle.model}</p>
            <p><strong>Color:</strong> {vehicle.color}</p>
            <p><strong>User ID:</strong> {vehicle.userId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetVehicleById;
