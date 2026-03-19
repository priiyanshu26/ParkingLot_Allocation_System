

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { saveToken } from '../../utils/auth';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const UserLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5174/login', {
//         userName: username,
//         password: password,
//       });

//       saveToken(res.data.token);
//       navigate('/user/dashboard');
//     } catch (err) {
//       alert('Login failed');
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
//         className="card shadow-lg text-white"
//         style={{
//           maxWidth: '900px',
//           width: '95%',
//           backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           border: 'none',
//           padding: '5rem 6rem',
//         }}
//       >
//         <div className="text-center mb-4">
//           <i className="bi bi-person-circle display-4 text-light"></i>
//           <h1 className="mt-3 fw-bold">USER LOGIN</h1>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="username" className="form-label fs-2">Username</label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter username"
//             className="form-control form-control-lg"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="form-label fs-2">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter password"
//             className="form-control form-control-lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="d-grid gap-3">
//           <button className="btn btn-outline-light py-3 fs-2" onClick={handleLogin}>
//             <i className="bi bi-box-arrow-in-right me-2"></i>
//             Login
//           </button>
//           <button
//             className="btn btn-outline-secondary py-3 fs-2"
//             onClick={() => navigate('/user/register')}
//           >
//             <i className="bi bi-person-plus-fill me-2"></i>
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { saveToken } from '../../utils/auth';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const UserLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5174/login', {
//         userName: username,
//         password: password,
//       });

//       // Check if the user is actually a "User"
//       if (res.data.role !== 'User') {
//         alert('Only regular users can login here.');
//         return;
//       }

//       saveToken(res.data.token);
//       navigate('/user/dashboard');
//     } catch (err) {
//       alert('Login failed');
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
//         className="card shadow-lg text-white"
//         style={{
//           maxWidth: '900px',
//           width: '95%',
//           backgroundColor: 'rgba(0, 0, 0, 0.75)',
//           border: 'none',
//           padding: '5rem 6rem',
//         }}
//       >
//         <div className="text-center mb-4">
//           <i className="bi bi-person-circle display-4 text-light"></i>
//           <h1 className="mt-3 fw-bold">USER LOGIN</h1>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="username" className="form-label fs-2">Username</label>
//           <input
//             id="username"
//             type="text"
//             placeholder="Enter username"
//             className="form-control form-control-lg"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>

//         <div className="mb-5">
//           <label htmlFor="password" className="form-label fs-2">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter password"
//             className="form-control form-control-lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="d-grid gap-3">
//           <button className="btn btn-outline-light py-3 fs-2" onClick={handleLogin}>
//             <i className="bi bi-box-arrow-in-right me-2"></i>
//             Login
//           </button>
//           <button
//             className="btn btn-outline-secondary py-3 fs-2"
//             onClick={() => navigate('/user/register')}
//           >
//             <i className="bi bi-person-plus-fill me-2"></i>
//             Register
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken, saveUserData } from '../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5174/login', {
        userName: username,
        password: password,
      });

      if (res.data.role !== 'User') {
        setFeedback({ type: 'warning', text: 'Only regular users can login here.' });
        return;
      }

      saveToken(res.data.token);
      saveUserData(res.data, { username, role: res.data.role });
      localStorage.setItem('role', res.data.role);

      navigate('/user/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setFeedback({ type: 'danger', text: 'Login failed. Please check username/password.' });
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
        className="card shadow-lg text-white"
        style={{
          maxWidth: '480px',
          width: '95%',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          border: 'none',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)',
        }}
      >
        <div className="text-center mb-4">
          <i className="bi bi-person-circle text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="mt-3 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>USER LOGIN</h1>
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)' }}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {feedback.text && (
          <div className={`alert alert-${feedback.type} py-2`} role="alert" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>
            {feedback.text}
          </div>
        )}

        <div className="d-grid gap-2">
          <button className="btn btn-outline-light py-2" style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }} onClick={handleLogin}>
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </button>
          <button
            className="btn btn-outline-light py-2"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
            onClick={() => navigate('/user/register')}
          >
            <i className="bi bi-person-plus-fill me-2"></i>Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

