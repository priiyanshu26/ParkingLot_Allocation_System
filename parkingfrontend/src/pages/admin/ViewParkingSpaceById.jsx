// import React, { useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../utils/auth';

// const ViewParkingSpaceById = () => {
//   const [id, setId] = useState('');
//   const [space, setSpace] = useState(null);

//   const fetchSpace = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5174/api/ParkingSpace/${id}`, {
//         headers: { Authorization: `Bearer ${getToken()}` }
//       });
//       setSpace(res.data);
//     } catch (err) {
//       console.error(err);
//       setSpace(null);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h3>View Parking Space by ID</h3>
//       <input
//         type="number"
//         placeholder="Enter ParkingSpaceId"
//         className="form-control mb-2"
//         value={id}
//         onChange={(e) => setId(e.target.value)}
//       />
//       <button className="btn btn-info" onClick={fetchSpace}>Search</button>

//       {space && (
//         <div className="mt-3 alert alert-success">
//           <p><strong>ID:</strong> {space.parkingSpaceId}</p>
//           <p><strong>Is Available:</strong> {space.isAvailable ? 'Yes' : 'No'}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewParkingSpaceById;



import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ViewParkingSpaceById = () => {
  const [id, setId] = useState('');
  const [space, setSpace] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSpace = async () => {
    if (!id) return;

    setLoading(true);
    setNotFound(false);
    setSpace(null);

    try {
      const res = await axios.get(`http://localhost:5174/api/ParkingSpace/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setSpace(res.data);
    } catch (err) {
      console.error(err);
      setNotFound(true);
    } finally {
      setLoading(false);
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
        {/* Back Button */}
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-3"
          onClick={() => navigate(-1)}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-search text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>VIEW PARKING SPACE BY ID</h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Check availability by ParkingSpace ID</p>
        </div>

        {/* Input + Button */}
        <div className="mb-4">
          <input
            type="number"
            placeholder="Enter ParkingSpace ID"
            className="form-control mb-3"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="btn btn-info py-2 w-100" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={fetchSpace}>
            <i className="bi bi-search me-2"></i>Search
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-info mt-3">Loading...</div>
        )}

        {/* Success */}
        {space && !notFound && (
          <div
            className="p-4 rounded text-white mt-4"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)',
            }}
          >
            <p><strong>ID:</strong> {space.parkingSpaceId}</p>
            <p><strong>Is Available:</strong> {space.isAvailable ? 'Yes' : 'No'}</p>
          </div>
        )}

        {/* Not Found */}
        {notFound && (
          <div className="alert alert-warning mt-3">
            No Parking Space found with ID {id}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewParkingSpaceById;


