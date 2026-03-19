

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getToken } from '../../../utils/auth';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const DeleteVehicle = () => {
//   const [id, setId] = useState('');
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       const token = getToken();

//       await axios.delete(`http://localhost:5174/api/vehicle/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert('Vehicle deleted successfully!');
//       setId('');
//     } catch (err) {
//       alert('Delete failed. Please check the Vehicle ID.');
//     }
//   };

//   return (
//     <div
//       className="d-flex align-items-center justify-content-center min-vh-100"
//       style={{
//         backgroundImage: `url('https://png.pngtree.com/background/20230425/original/pngtree-parking-lot-full-of-parked-vehicles-picture-image_2471799.jpg')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <div
//         className="card shadow-lg text-white position-relative"
//         style={{
//           maxWidth: '850px',
//           width: '90%',
//           backgroundColor: 'rgba(0, 0, 0, 0.85)',
//           border: 'none',
//           padding: '6rem 6rem',
//         }}
//       >
//         {/* Header */}
//         <div className="text-center mb-4">
//           <i className="bi bi-trash3-fill display-4 text-danger"></i>
//           <h1 className="fw-bold mt-3">DELETE VEHICLE</h1>
//           <p className="text-secondary fs-3">Enter the vehicle ID you want to delete</p>
//         </div>

//         {/* Input Field */}
//         <div className="mb-4">
//           <label className="form-label fs-2 text-white">Vehicle ID</label>
//           <input
//             type="text"
//             id="vehicleId"
//             className="form-control"
//             placeholder="Enter Vehicle ID"
//             value={id}
//             onChange={(e) => setId(e.target.value)}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="d-flex justify-content-between mt-3">
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => navigate('/user/dashboard')}
//           >
//             <i className="bi bi-arrow-left me-2"></i>Back
//           </button>
//           <button className="btn btn-danger px-4" onClick={handleDelete}>
//             <i className="bi bi-trash-fill me-2"></i>Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteVehicle;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../utils/auth'; 
import 'bootstrap-icons/font/bootstrap-icons.css';

const DeleteVehicle = () => {
  const [id, setId] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const token = getToken();

      await axios.delete(`http://localhost:5174/api/vehicle/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedback({ type: 'success', text: 'Vehicle deleted successfully!' });
      setId('');
    } catch {
      setFeedback({ type: 'danger', text: 'Delete failed. Please check the Vehicle ID.' });
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
          <i className="bi bi-trash3-fill text-danger" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>DELETE VEHICLE</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter the vehicle ID you want to delete</p>
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <label htmlFor="vehicleId" className="form-label text-white" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Vehicle ID</label>
          <input
            type="text"
            id="vehicleId"
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
        <div className="d-flex justify-content-between mt-3 gap-2">
          <button
            className="btn btn-outline-secondary py-2"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            onClick={() => navigate('/user/dashboard')}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
          <button className="btn btn-danger py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleDelete}>
            <i className="bi bi-trash-fill me-2"></i>Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteVehicle;
