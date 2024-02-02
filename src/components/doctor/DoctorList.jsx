import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../../redux/doctor/doctorSlice';
import Sidenav from '../Navbar/Sidenav';

const DoctorList = () => {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor.doctors);
  const status = useSelector((state) => state.doctor.status);
  const error = useSelector((state) => state.doctor.error);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  // Define custom settings for the carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="flex flex-col justify-center items-center md:pl-[15rem] md:pr-[3rem] pr-3  w-full">
        <h1 className="text-[#1F1717] md:pt-5">Doctors List</h1>
        <span className="text-gray-400">Choose a doctor</span>

        {status === 'failed' && (
          <p className="text-red-500">
            Error:
            {error}
          </p>
        )}

        {status === 'succeeded' && doctors.length > 0 ? (
          <div className="h-full w-full overflow-hidden">
            <Carousel responsive={responsive}>
              {doctors.map((doctor) => (
                <div key={doctor.id}>
                  <Link to={`/doctors/${doctor.id}`} className="no-underline">
                    <div className="flex items-center justify-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="rounded-full object-cover w-full h-72 max-[967px]:w-62"
                      />
                    </div>
                    <div className="gap-0 flex flex-col justify-center items-center md:gap-1 mt-7">
                      <div className="text-[#1F1717]">
                        <h2 className="text-[30px] text-center">
                          {doctor.name}
                        </h2>
                      </div>
                      <div className="text-[20px] text-gray-700 font-semi-bold md:text-[18px] md:leading-[30px] text-center">
                        {doctor.specialization}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          status === 'succeeded'
          && doctors.length === 0 && (
            <p className="text-xl mt-5 text-slate-500">No Doctor Available</p>
          )
        )}
      </div>
    </div>
  );
};

export default DoctorList;
