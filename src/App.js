import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import DoctorList from './components/doctor/DoctorList';
// import Doctors from './components/Doctors';
// import Doctors from "./components/Doctors/Doctors";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/doctors" element={<Doctors />} /> */}

      <Route path="/doctors" element={<DoctorList />} />
      {/* <Route path="/add-doctor" element={<AddDoctorForm />} /> */}
      {/* <Route path="/doctors/:doctorId" element={<DoctorDetails />} /> */}
      {/* <Route path="New-reservation" element={<NewReservation />} /> */}
      {/* <Route path="My-reservations" element={<MyReservations />} /> */}
      {/* <Route path="/delete-doctor" element={<DeleteDoctor />} /> */}
    </Routes>
    <ToastContainer />
  </Router>
);

export default App;
