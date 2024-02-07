import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDoctors } from '../redux/doctor/doctorSlice';
import Sidenav from './Navbar/Sidenav';

const Doctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  return (
    <>
      <Sidenav />
      <div className="flex flex-col justify-center items-center md:pl-[15rem] md:pr-[3rem] pr-3">
        <h1 className="text-[#1F1717] md:pt-5">Doctors List</h1>
        <span className="text-gray-400">Choose a doctor</span>

      </div>
    </>
  );
};

export default Doctors;
