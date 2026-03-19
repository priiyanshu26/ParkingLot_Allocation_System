



// import React, { useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../../utils/auth';

// const AllocateParking = () => {
//   const [userId, setUserId] = useState('');
//   const [vehicleId, setVehicleId] = useState('');
//   const [parkingSpaceId, setParkingSpaceId] = useState('');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [message, setMessage] = useState('');
//   const [allocationResult, setAllocationResult] = useState(null);

//   const handleAllocate = async () => {
//     // Validate inputs
//     if (!userId || !vehicleId || !parkingSpaceId || !fromDate || !toDate) {
//       alert('All fields are required');
//       return;
//     }

//     try {
//       const payload = {
//         userId: parseInt(userId),
//         vehicleId: parseInt(vehicleId),
//         parkingSpaceId: parseInt(parkingSpaceId),
//         fromDate: new Date(fromDate).toISOString(),
//         toDate: new Date(toDate).toISOString(),
//       };

//       console.log('Sending payload:', payload);

//       const response = await axios.post(
//         'http://localhost:5174/api/parkingallocation',
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );

//       setAllocationResult(response.data);
//       setMessage('✅ Parking space allocated successfully!');
//     } catch (error) {
//       console.error('❌ Allocation error:', error.response?.data || error.message);
//       setMessage(
//         '❌ Allocation failed: ' + (error.response?.data?.message || error.message)
//       );
//     }
//   };

//   const formatToLocalTime = (utcString) => {
//     return new Date(utcString).toLocaleString('en-IN', {
//       timeZone: 'Asia/Kolkata',
//       hour12: true,
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <div className="container mt-5">
//       <h3>Allocate Parking Space</h3>

//       <div className="row">
//         <div className="col-md-3 mb-3">
//           <label>User ID</label>
//           <input
//             type="number"
//             className="form-control"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//         </div>

//         <div className="col-md-3 mb-3">
//           <label>Vehicle ID</label>
//           <input
//             type="number"
//             className="form-control"
//             value={vehicleId}
//             onChange={(e) => setVehicleId(e.target.value)}
//           />
//         </div>

//         <div className="col-md-3 mb-3">
//           <label>Parking Space ID</label>
//           <input
//             type="number"
//             className="form-control"
//             value={parkingSpaceId}
//             onChange={(e) => setParkingSpaceId(e.target.value)}
//           />
//         </div>

//         <div className="col-md-3 mb-3">
//           <label>From Date</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//           />
//         </div>

//         <div className="col-md-3 mb-3">
//           <label>To Date</label>
//           <input
//             type="datetime-local"
//             className="form-control"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//           />
//         </div>
//       </div>

//       <button className="btn btn-primary mt-3" onClick={handleAllocate}>
//         Allocate
//       </button>

//       {message && (
//         <div className="alert alert-info mt-3" role="alert">
//           {message}
//         </div>
//       )}

//       {allocationResult && (
//         <div className="mt-4">
//           <h5>Allocation Details</h5>
//           <ul className="list-group">
//             <li className="list-group-item">
//               <strong>Allocation ID:</strong> {allocationResult.allocationId}
//             </li>
//             <li className="list-group-item">
//               <strong>Parking Space ID:</strong> {allocationResult.parkingSpaceId}
//             </li>
//             <li className="list-group-item">
//               <strong>From:</strong> {formatToLocalTime(allocationResult.fromDate)}
//             </li>
//             <li className="list-group-item">
//               <strong>To:</strong> {formatToLocalTime(allocationResult.toDate)}
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllocateParking;





import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AllocateParking = () => {
  const [userId, setUserId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [parkingSpaceId, setParkingSpaceId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const navigate = useNavigate();

  const handleAllocate = async () => {
    if (!userId || !vehicleId || !parkingSpaceId || !fromDate || !toDate) {
      setMessageType('warning');
      setMessage('All fields are required');
      return;
    }

    try {
      const payload = {
        userId: parseInt(userId),
        vehicleId: parseInt(vehicleId),
        parkingSpaceId: parseInt(parkingSpaceId),
        fromDate: new Date(fromDate).toISOString(),
        toDate: new Date(toDate).toISOString(),
      };

      const response = await axios.post(
        'http://localhost:5174/api/parkingallocation',
        payload,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      navigate('/user/allocation/details', {
        state: { allocation: response.data },
      });
    } catch (error) {
      setMessageType('danger');
      setMessage(
        ' Allocation failed: ' + (error.response?.data?.message || error.message)
      );
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
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
          border: 'none',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-3"
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <i className="bi bi-diagram-3-fill text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>ALLOCATE PARKING</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter details to allocate a parking slot</p>
        </div>

        {/* Form Inputs (Vertical) */}
        {[
          { label: 'User ID', type: 'number', value: userId, onChange: setUserId },
          { label: 'Vehicle ID', type: 'number', value: vehicleId, onChange: setVehicleId },
          { label: 'Parking Space ID', type: 'number', value: parkingSpaceId, onChange: setParkingSpaceId },
          { label: 'From Date', type: 'datetime-local', value: fromDate, onChange: setFromDate },
          { label: 'To Date', type: 'datetime-local', value: toDate, onChange: setToDate },
        ].map((input, idx) => (
          <div className="mb-4" key={idx}>
            <label className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>{input.label}</label>
            <input
              type={input.type}
              className="form-control"
              placeholder={`Enter ${input.label}`}
              value={input.value}
              onChange={(e) => input.onChange(e.target.value)}
            />
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center">
          <button className="btn btn-primary py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleAllocate}>
            <i className="bi bi-check-circle me-2"></i>Allocate
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`alert alert-${messageType} mt-4 text-center`} style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>{message}</div>
        )}

      </div>
    </div>
  );
};

export default AllocateParking;
