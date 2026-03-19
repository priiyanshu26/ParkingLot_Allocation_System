

// import React, { useState } from 'react';
// import axios from 'axios';
// import { getToken } from '../../utils/auth';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const DeleteUser = () => {
//   const [userId, setUserId] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     // ✅ Validate empty input
//     if (!userId) {
//       setMessage("⚠️ Please enter a User ID.");
//       return;
//     }

//     // ✅ Debug token value
//     const token = getToken();
//     console.log("JWT Token =>", token);

//     try {
//       const response = await axios.delete(`http://localhost:5174/api/User/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage('✅ User deleted successfully!');
//     } catch (err) {
//       console.error("Delete Error:", err.response || err.message);

//       // ✅ Show backend-provided error message if available
//       const errorMessage =
//         err.response?.data?.message ||
//         err.response?.statusText ||
//         err.message ||
//         "Unknown error occurred.";

//       setMessage(`❌ Error: ${errorMessage}`);
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
//           maxWidth: '800px',
//           width: '90%',
//           backgroundColor: 'rgba(0, 0, 0, 0.85)',
//           border: 'none',
//           padding: '4rem 5rem',
//         }}
//       >
//         <button
//           className="btn btn-outline-danger btn-lg fs-4 position-absolute top-0 end-0 m-4 px-4 py-2"
//           onClick={() => navigate('/admin/dashboard')}
//         >
//           <i className="bi bi-arrow-left-circle me-2 fs-3"></i>Back
//         </button>

//         <div className="text-center mb-4">
//           <i className="bi bi-person-x-fill display-5 text-danger"></i>
//           <h1 className="fw-bold mt-3">DELETE USER</h1>
//           <p className="text-secondary fs-3">Enter the User ID to delete from the system</p>
//         </div>

//         <div className="mb-3">
//           <input
//             type="number"
//             placeholder="Enter User ID"
//             className="form-control form-control-lg"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//         </div>

//         <div className="d-grid">
//           <button className="btn btn-danger btn-lg fw-bold" onClick={handleDelete}>
//             <i className="bi bi-trash-fill me-2"></i>DELETE USER
//           </button>
//         </div>

//         {message && (
//           <div
//             className={`alert text-center mt-4 fw-semibold ${
//               message.startsWith('✅') ? 'alert-success' : 'alert-danger'
//             }`}
//             role="alert"
//           >
//             {message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DeleteUser;



import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Clear previous messages
    setMessage('');

    // ✅ Enhanced input validation
    if (!userId) {
      setMessage("⚠️ Please enter a User ID.");
      return;
    }

    if (userId <= 0) {
      setMessage("⚠️ Please enter a valid positive User ID.");
      return;
    }

    // ✅ Check if token exists
    const token = getToken();
    if (!token) {
      setMessage("❌ Authentication token not found. Please login again.");
      navigate('/admin/login');
      return;
    }

    console.log("JWT Token =>", token);
    setIsLoading(true);

    try {
      const response = await axios.delete(`http://localhost:5174/api/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('✅ User deleted successfully!');
      setUserId(''); // Clear input after successful deletion
      setShowConfirm(false);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);

    } catch (err) {
      console.error("Delete Error:", err.response || err.message);

      // ✅ Enhanced error handling
      if (err.response?.status === 401) {
        setMessage("❌ Authentication failed. Please login again.");
        navigate('/admin/login');
        return;
      }

      if (err.response?.status === 404) {
        setMessage(`❌ User with ID ${userId} not found.`);
        return;
      }

      const errorMessage =
        err.response?.data?.message ||
        err.response?.statusText ||
        err.message ||
        "Unknown error occurred.";

      setMessage(`❌ Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!userId || userId <= 0) {
      setMessage("⚠️ Please enter a valid positive User ID.");
      return;
    }
    setShowConfirm(true);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setMessage('');
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
        <button
          className="btn btn-outline-danger position-absolute top-0 end-0 m-3 py-2"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
          onClick={() => navigate('/admin/dashboard')}
          disabled={isLoading}
        >
          <i className="bi bi-arrow-left-circle me-2"></i>Back
        </button>

        <div className="text-center mb-4">
          <i className="bi bi-person-x-fill text-danger" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}></i>
          <h1 className="fw-bold mt-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)' }}>DELETE USER</h1>
          <p className="text-secondary" style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.05rem)' }}>Enter the User ID to delete from the system</p>
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Enter User ID"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={isLoading}
            min="1"
          />
        </div>

        {!showConfirm ? (
          <div className="d-grid">
            <button 
              className="btn btn-danger py-2 fw-bold" 
              style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
              onClick={handleConfirmDelete}
              disabled={isLoading}
            >
              <i className="bi bi-trash-fill me-2"></i>DELETE USER
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="alert alert-warning mb-3">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <strong>Are you sure you want to delete User ID: {userId}?</strong>
              <br />
              <small>This action cannot be undone.</small>
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button 
                className="btn btn-danger py-2 fw-bold me-md-2" 
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>Yes, Delete
                  </>
                )}
              </button>
              <button 
                className="btn btn-secondary py-2" 
                style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
                onClick={handleCancelDelete}
                disabled={isLoading}
              >
                <i className="bi bi-x-circle me-2"></i>Cancel
              </button>
            </div>
          </div>
        )}

        {message && (
          <div
            className={`alert text-center mt-4 fw-semibold ${
              message.startsWith('✅') ? 'alert-success' : 
              message.startsWith('⚠️') ? 'alert-warning' : 'alert-danger'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteUser;