import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchDoctors } from '../redux/doctor/doctorSlice';
import Sidenav from './Navbar/Sidenav';

const Doctors = () => {
  const dispatch = useDispatch();
  //   const doctors = useSelector((state) => state.doctor.doctors);
  //   const status = useSelector((state) => state.doctor.status);
  //   const error = useSelector((state) => state.doctor.error);

  // const [startIndex, setStartIndex] = useState(0);
  // const itemsPerPageSmallScreen = 1;
  // const itemsPerPageMediumScreen = 3;

  // const getItemsPerPage = () => (window.innerWidth >= 768
  //   ? itemsPerPageMediumScreen
  //   : itemsPerPageSmallScreen);

  // const handlePrev = () => {
  //   if (startIndex > 0) {
  //     setStartIndex(startIndex - getItemsPerPage());
  //   }
  // };

  //   const handleNext = () => {
  //     if (startIndex + getItemsPerPage() < doctors.length) {
  //       setStartIndex(startIndex + getItemsPerPage());
  //     }
  //   };

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  //   const paginatedDoctors = doctors.slice(
  //     startIndex,
  //     startIndex + getItemsPerPage()
  //   );

  // window.addEventListener('resize', () => {
  //   setStartIndex(0); // Reset startIndex on window resize to prevent issues with pagination
  // });

  //     if (!doctors) {
  //     return <p>Loading...</p>;
  //   }

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
