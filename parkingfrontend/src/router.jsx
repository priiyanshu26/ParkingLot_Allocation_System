import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister';
import RegisterVehicle from './pages/user/vehicle/RegisterVehicle';
import UpdateVehicle from './pages/user/vehicle/UpdateVehicle';
import GetVehicleById from './pages/user/vehicle/GetVehicleById';
import DeleteVehicle from './pages/user/vehicle/DeleteVehicle';
import ViewAllVehicles from './pages/user/vehicle/ViewAllVehicles';
import VehicleMenu from './pages/user/VehicleMenu';
import AvailableSpace from './pages/user/parking/AvailableSpace';
import AvailableSpaceByDate from './pages/user/parking/AvailableSpaceByDate';
import AvailableSlotResults from './pages/user/parking/AvailableSlotResults';
import AllocateParking from './pages/user/allocation/AllocateParking';
import AllocateById from './pages/user/allocation/AllocateById';
import AllocationDetails from './pages/user/allocation/AllocationDetails';
import ViewAllUsers from './pages/admin/ViewAllUsers';
import DeleteUser from './pages/admin/DeleteUser';
import DeleteVehicleAdmin from './pages/admin/DeleteVehicle';
import ViewAllVehiclesAdmin from './pages/admin/ViewAllVehicles';
import ViewAllAllocations from './pages/admin/ViewAllAllocations';
import ViewParkingSpaceById from './pages/admin/ViewParkingSpaceById';






const Router = () => {
  return (
  
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
         <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/vehicle/register" element={<RegisterVehicle />} />
      <Route path="/user/vehicle/update" element={<UpdateVehicle />} />
      <Route path="/user/vehicle/get" element={<GetVehicleById />} />
      <Route path="/user/vehicle/delete" element={<DeleteVehicle />} />
      <Route path="/user/vehicle/view-all" element={<ViewAllVehicles />} />
      <Route path="/user/vehicle-menu" element={<VehicleMenu />} />
      <Route path="/user/parking/available" element={<AvailableSpace />} />
      <Route path="/user/parking/available-by-date" element={<AvailableSpaceByDate />} />
      <Route path="/user/parking/slot-results" element={<AvailableSlotResults />} />
     <Route path="/user/allocation/allocate" element={<AllocateParking/>}/>
      <Route path="/user/allocation/allocate-by-id" element={<AllocateById/>}/>
      <Route path="/user/allocation/details" element={<AllocationDetails />} />
      <Route path="/admin/view-users" element={<ViewAllUsers />} />
      <Route path="/admin/delete-user" element={<DeleteUser />} />
      <Route path="/admin/delete-vehicle" element={<DeleteVehicleAdmin />} />
      <Route path="/admin/view-vehicles" element={<ViewAllVehiclesAdmin />} />
      <Route path="/admin/view-allocations" element={<ViewAllAllocations />} />
       <Route path="/admin/parking-space" element={<ViewParkingSpaceById />} />
      </Routes>
    
  );
};

export default Router;