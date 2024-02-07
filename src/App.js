import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import DoctorList from './components/doctor/DoctorList';
import DeleteDoctor from './components/doctor/DeleteDoctor';
import DoctorDetails from './components/doctor/DoctorDetails';
import AddDoctorForm from './components/doctor/AddDoctorForm';
import NewReservation from './components/pages/NewReservation';
import MyReservations from './components/pages/MyReservations';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/doctors" element={<DoctorList />} />
      <Route path="/add-doctor" element={<AddDoctorForm />} />
      <Route path="/doctors/:doctorId" element={<DoctorDetails />} />
      <Route path="New-reservation" element={<NewReservation />} />
      <Route path="My-reservations" element={<MyReservations />} />
      <Route path="/delete-doctor" element={<DeleteDoctor />} />
    </Routes>
    <ToastContainer />
  </Router>
);

export default App;
