
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const AvailableSpaceByDate = () => {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = () => {
//     if (!fromDate || !toDate) {
//       alert('Please select both dates');
//       return;
//     }

//     navigate(`/user/parking/slot-results?fromDate=${fromDate}&toDate=${toDate}`);
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
//           maxWidth: '800px',
//           width: '90%',
//           backgroundColor: 'rgba(0, 0, 0, 0.85)',
//           border: 'none',
//           padding: '4rem 4rem',
//         }}
//       >
//         {/* Back Button */}
//         <button
//           className="btn btn-outline-danger position-absolute top-0 end-0 m-3"
//           onClick={() => navigate('/user/dashboard')}
//         >
//           <i className="bi bi-arrow-left-circle me-2"></i>Back
//         </button>

//         {/* Header */}
//         <div className="text-center mb-4">
//           <i className="bi bi-calendar-range display-5 text-light"></i>
//           <h1 className="fw-bold mt-3">CHECK AVAIABLITY</h1>
//           <p className="text-secondary fs-3">Select a date range to view available slots</p>
//         </div>

//         {/* Date Inputs */}
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label fs-2">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="form-control form-control-lg"
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label className="form-label fs-2">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="form-control form-control-lg"
//             />
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center mt-4">
//           <button className="btn btn-outline-info px-5 py-3 fs-2" onClick={handleSubmit}>
//             <i className="bi bi-search me-2"></i>View Slots
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AvailableSpaceByDate;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AvailableSpaceByDate = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!fromDate || !toDate) {
      setMessage('Please select both dates');
      return;
    }

    setMessage('');

    navigate(`/user/parking/slot-results?fromDate=${fromDate}&toDate=${toDate}`);
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
          onClick={() => navigate('/user/dashboard')}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <i className="bi bi-calendar-range text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>CHECK AVAILABILITY</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Select a date range to view available slots</p>
        </div>

        {/* Date Inputs */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="fromDate" className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>From Date</label>
            <input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="toDate" className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>To Date</label>
            <input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {message && (
          <div className="alert alert-warning py-2" role="alert" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>
            {message}
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mt-4">
          <button className="btn btn-outline-info py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleSubmit}>
            <i className="bi bi-search me-2"></i>View Slots
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableSpaceByDate;
