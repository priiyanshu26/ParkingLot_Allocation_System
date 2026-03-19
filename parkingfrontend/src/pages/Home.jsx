// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="container text-center mt-5">
//       <h1 className="mb-4">Welcome to Parking Lot Allotment System</h1>
//       <div className="d-flex justify-content-center gap-4">
//         <button
//           className="btn btn-primary px-4"
//           onClick={() => navigate('/admin/login')}
//         >
//           Admin
//         </button>
//         <button
//           className="btn btn-success px-4"
//           onClick={() => navigate('/user/login')}
//         >
//           User
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const Home = () => {
//   const navigate = useNavigate();

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
//         className="card shadow-lg text-white text-center"
//         style={{
//           maxWidth: '1400px', // Increased from 1100px
//           width: '98%',
//           backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           border: 'none',
//           padding: '12rem 15rem', // Increased padding
//         }}
//       >
//         <i className="bi bi-car-front-fill display-2 text-light mb-4"></i>

//         <h1 className="fw-bold mb-4" style={{ fontSize: '5rem', whiteSpace: 'nowrap' }}>
//           PARKING LOT ALLOTMENT SYSTEM
//         </h1>

//         <p className="text-secondary mb-5 fs-4">CHOOSE ROLE TO CONTINUE</p>

//         <div className="d-flex flex-column flex-md-row justify-content-center gap-5">
//           <button
//             className="btn btn-outline-light px-5 py-3 fs-4"
//             onClick={() => navigate('/admin/login')}
//           >
//             <i className="bi bi-shield-lock-fill me-2"></i>
//             ADMIN
//           </button>
//           <button
//             className="btn btn-outline-light px-5 py-3 fs-4"
//             onClick={() => navigate('/user/login')}
//           >
//             <i className="bi bi-person-circle me-2"></i>
//             USER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;




import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  const navigate = useNavigate();

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
        className="card shadow-lg text-white text-center"
        style={{
          maxWidth: '700px',
          width: '92%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: 'none',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <i className="bi bi-car-front-fill text-light mb-3" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}></i>

        <h1
          className="fw-bold mb-3"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2.6rem)' }}
        >
          PARKING LOT ALLOTMENT SYSTEM
        </h1>

        <p className="text-secondary mb-4" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)', letterSpacing: '0.06em' }}>CHOOSE ROLE TO CONTINUE</p>

        <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
          <button
            className="btn btn-outline-light px-4 py-2"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
            onClick={() => navigate('/admin/login')}
          >
            <i className="bi bi-shield-lock-fill me-2"></i>ADMIN
          </button>
          <button
            className="btn btn-outline-light px-4 py-2"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)' }}
            onClick={() => navigate('/user/login')}
          >
            <i className="bi bi-person-circle me-2"></i>USER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;


