
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../../utils/auth';

// const AvailableSpace = () => {
//   const [spaces, setSpaces] = useState([]);

//   useEffect(() => {
//     const fetchSpaces = async () => {
//       const token = getToken();
//       console.log('Token:', token); 

//       try {
//         const res = await axios.get('http://localhost:5174/api/ParkingSpace', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         console.log('API Response:', res.data); 
//         setSpaces(res.data); 
//       } catch (err) {
//         console.error('Error fetching available spaces:', err);
//       }
//     };

//     fetchSpaces();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h3>Available Parking Spaces</h3>
//       {spaces.length === 0 ? (
//         <p>No parking spaces available.</p>
//       ) : (
//         <ul className="list-group">
//           {spaces.map((space, index) => (
//             <li key={index} className="list-group-item">
//               ID: {space.parkingSpaceId}, Available: {space.isAvailable ? 'Yes' : 'No'}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default AvailableSpace;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AvailableSpace = () => {
  const [spaces, setSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      const token = getToken();
      try {
        const res = await axios.get('http://localhost:5174/api/ParkingSpace', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSpaces(res.data);
      } catch (err) {
        console.error('Error fetching available spaces:', err);
      }
    };
    fetchSpaces();
  }, []);

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
        className="container position-relative"
        style={{
          padding: 'clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 2.5vw, 1.5rem)',
        }}
      >
        {/* Back Button */}
        <button
          className="btn btn-outline-light position-absolute top-0 end-0 mt-3 me-3"
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-5 text-white">
          <i className="bi bi-parking" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-2" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>AVAIABLE PARKING SPACES</h1>
          <p className="text-light" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Explore open slots in real-time</p>
        </div>

        {/* Grid of Cards */}
        <div className="row justify-content-center g-4">
          {spaces.length === 0 ? (
            <div className="text-white text-center" style={{ fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)' }}>No parking spaces available.</div>
          ) : (
            spaces.map((space) => (
              <div key={space.parkingSpaceId} className="col-md-4">
                <div
                  className="p-4 rounded shadow text-white text-center h-100"
                  style={{
                    background: 'hsla(0, 1%, 19%, 1.00)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(10, 10, 10, 0.2)',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <i className="bi bi-geo-alt-fill mb-3 text-info" style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)' }}></i>
                  <h4 className="mb-2" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>Slot #{space.parkingSpaceId}</h4>
                  <p
                    className={`badge px-3 py-2 ${
                      space.isAvailable ? 'bg-success' : 'bg-danger'
                    }`}
                    style={{ fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)' }}
                  >
                    {space.isAvailable ? 'Available' : 'Occupied'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableSpace;

