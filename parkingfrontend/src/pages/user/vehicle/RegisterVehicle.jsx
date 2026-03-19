// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { getToken } from '../../../utils/auth';

// const RegisterVehicle = () => {
//   const [formData, setFormData] = useState({
//     numberPlate: '',
//     type: '',
//     model: '',
//     color: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const token = getToken();

//       await axios.post('http://localhost:5174/api/vehicle', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       alert('Vehicle registered successfully!');
//       navigate('/user/dashboard');
//     } catch (err) {
//       alert('Registration failed');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Register Vehicle</h2>
//       {['numberPlate', 'type', 'model', 'color'].map((field) => (
//         <input
//           key={field}
//           type="text"
//           name={field}
//           placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//           className="form-control my-2"
//           value={formData[field]}
//           onChange={handleChange}
//         />
//       ))}
//       <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default RegisterVehicle;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const RegisterVehicle = () => {
  const [formData, setFormData] = useState({
    numberPlate: '',
    type: '',
    model: '',
    color: '',
  });
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();

      await axios.post('http://localhost:5174/api/vehicle', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFeedback({ type: 'success', text: 'Vehicle registered successfully!' });
      setTimeout(() => navigate('/user/dashboard'), 900);
    } catch {
      setFeedback({ type: 'danger', text: 'Registration failed. Please try again.' });
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
          <i className="bi bi-truck-front-fill text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>REGISTER VEHICLE</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter vehicle details below</p>
        </div>

        {/* Form Fields */}
        {['numberPlate', 'type', 'model', 'color'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>{field}</label>
            <input
              type="text"
              name={field}
              className="form-control"
              placeholder={`Enter ${field}`}
              value={formData[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        {feedback.text && (
          <div className={`alert alert-${feedback.type} py-2`} role="alert" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>
            {feedback.text}
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4 gap-2">
          <button
            className="btn btn-outline-secondary py-2"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            onClick={() => navigate('/user/dashboard')}
          >
            <i className="bi bi-arrow-left me-2"></i>Back
          </button>
          <button className="btn btn-success py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleSubmit}>
            <i className="bi bi-check2-circle me-2"></i>Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterVehicle;
