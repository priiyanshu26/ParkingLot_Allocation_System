


// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import { getToken } from '../../../utils/auth';

// const AvailableSlotResults = () => {
//   const [slots, setSlots] = useState([]);
//   const [searchParams] = useSearchParams();

//   const fromDate = searchParams.get('fromDate');
//   const toDate = searchParams.get('toDate');

//   // Format dates for display
//   const formatDisplayDate = (isoDate) => {
//     if (!isoDate) return '';
//     const date = new Date(isoDate);
//     return date.toLocaleDateString('en-IN', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });
//   };

//   useEffect(() => {
//     const fetchAvailableSlots = async () => {
//       try {
//         console.log("Calling API with dates:", fromDate, toDate);

//         const response = await axios.get(
//           `http://localhost:5174/api/ParkingSpace/available?fromDate=${fromDate}&toDate=${toDate}`
// ,
//           {
//             headers: {
//               Authorization: `Bearer ${getToken()}`,
//             },
//           }
//         );

//         console.log("API Response:", response.data);
//         setSlots(response.data);
//       } catch (error) {
//         console.error("Error fetching slots:", error);
//       }
//     };

//     if (fromDate && toDate) {
//       fetchAvailableSlots();
//     }
//   }, [fromDate, toDate]);

//   return (
//     <div className="container mt-5">
//       <h3>
//         Available Slots from <strong>{formatDisplayDate(fromDate)}</strong> to{' '}
//         <strong>{formatDisplayDate(toDate)}</strong>
//       </h3>

//       {slots.length === 0 ? (
//         <p className="mt-3">No slots available in the selected range.</p>
//       ) : (
//         <ul className="list-group mt-3">
//           {slots.map((slot, index) => (
//             <li key={index} className="list-group-item">
//               ParkingSpaceId: {slot.parkingSpaceId}, Available: {slot.isAvailable ? 'Yes' : 'No'}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AvailableSlotResults;


import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AvailableSlotResults = () => {
  const [slots, setSlots] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');

  const formatDisplayDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5174/api/ParkingSpace/available?fromDate=${fromDate}&toDate=${toDate}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setSlots(response.data);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (fromDate && toDate) {
      fetchAvailableSlots();
    }
  }, [fromDate, toDate]);

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
          backgroundColor: 'rgba(0, 0, 0, 0.88)',
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
          <i className="bi bi-calendar-check text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h2 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>Available Slots</h2>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>
            From <strong>{formatDisplayDate(fromDate)}</strong> to{' '}
            <strong>{formatDisplayDate(toDate)}</strong>
          </p>
        </div>

        {/* Slot List */}
        {slots.length === 0 ? (
          <div className="text-center text-warning mt-4" style={{ fontSize: 'clamp(0.95rem, 1.9vw, 1.15rem)' }}>
            No slots available in the selected range.
          </div>
        ) : (
          <div className="row">
            {slots.map((slot, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div
                  className="p-4 rounded border border-light"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    fontSize: 'clamp(0.9rem, 1.7vw, 1.05rem)',
                    lineHeight: '1.8',
                  }}
                >
                  <p><strong>Parking Space ID:</strong> {slot.parkingSpaceId}</p>
                  <p><strong>Available:</strong> {slot.isAvailable ? 'Yes' : 'No'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableSlotResults;
