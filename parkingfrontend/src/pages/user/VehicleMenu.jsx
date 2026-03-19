
import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2>Vehicle Options</h2>
      <button
        className="btn btn-success m-2"
        onClick={() => navigate('/user/vehicle/register')}
      >
        Register Vehicle
      </button>
      <button
        className="btn btn-warning m-2"
        onClick={() => navigate('/user/vehicle/update')}
      >
        Update Vehicle
      </button>
      <button
        className="btn btn-info m-2"
        onClick={() => navigate('/user/vehicle/get')}
      >
        Get Vehicle by ID
      </button>
      <button
        className="btn btn-danger m-2"
        onClick={() => navigate('/user/vehicle/delete')}
      >
        Delete Vehicle
      </button>
    </div>
  );
};

export default VehicleMenu; // ✅ Make sure this line exists!
