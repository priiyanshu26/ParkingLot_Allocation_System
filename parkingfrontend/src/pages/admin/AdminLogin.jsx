

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { saveToken } from '../../utils/auth';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:5174/login', {
//         userName: username,
//         password: password,
//       });

//       // Check if the user is actually an "Admin"
//       if (res.data.role !== 'Admin') {
//         alert('Only admins can login here.');
//         return;
//       }

//       saveToken(res.data.token);
//       navigate('/admin/dashboard');
//     } catch (err) {
//       alert('Invalid credentials');
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
//           padding: '8rem 8rem',
//         }}
//       >
//         <div className="text-center mb-4">
//           <i className="bi bi-shield-lock-fill display-4 text-light"></i>
//           <h1 className="mt-3 fw-bold">ADMIN LOGIN</h1>
//         </div>

//         <div className="mb-4">
//           <label htmlFor="username" className="form-label fs-1">Username</label>
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
//           <label htmlFor="password" className="form-label fs-1">Password</label>
//           <input
//             id="password"
//             type="password"
//             placeholder="Enter password"
//             className="form-control form-control-lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <button className="btn btn-outline-light w-100 py-3 fs-1" onClick={handleLogin}>
//           <i className="bi bi-box-arrow-in-right me-2"></i>
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../utils/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Clear previous errors
    setError('');

    // Validate inputs
    if (!username.trim()) {
      setError('⚠️ Please enter a username.');
      return;
    }

    if (!password.trim()) {
      setError('⚠️ Please enter a password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5174/login', {
        userName: username.trim(),
        password: password.trim(),
      });

      // Check if the user is actually an "Admin"
      if (res.data.role !== 'Admin') {
        setError('❌ Access denied. Only admins can login here.');
        return;
      }

      saveToken(res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login Error:', err.response || err.message);
      
      // Better error handling
      const errorMessage = 
        err.response?.data?.message || 
        err.response?.statusText || 
        'Invalid credentials. Please try again.';
      
      setError(`❌ ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
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
          <i className="bi bi-shield-lock-fill text-light" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="mt-3 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>ADMIN LOGIN</h1>
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
            onKeyPress={handleKeyPress}
            disabled={isLoading}
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
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </div>

        <button 
          className="btn btn-outline-light w-100 py-2" 
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Logging in...
            </>
          ) : (
            <>
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Login
            </>
          )}
        </button>

        {error && (
          <div className="alert alert-danger text-center mt-4 fw-semibold" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
