import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { fetchDoctors } from '../../redux/doctor/doctorSlice';
import Sidenav from '../Navbar/Sidenav';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DoctorList = () => {
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);
  const { status, error } = useSelector((state) => state.doctor);

  // Fetch doctors when the component mounts
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="flex ">
      <Sidenav />
      <div className="flex flex-col justify-center items-center md:pl-[15rem] md:pr-[3rem] pr-3 border border-red-500 w-full">
        <h1 className="text-[#1F1717] md:pt-5">Doctors List</h1>
        <span className="text-gray-400">Choose a doctor</span>

        {/* Display error message if fetch fails */}
        {status === 'failed' && (
          <p className="text-red-500">
            Error:
            {error}
          </p>
        )}

        {status === 'succeeded' && doctors.length > 0 ? (
          <div className="h-full w-full border border-cyan-400 overflow-hidden">
            {/* Replace ul with Slider component */}
            <Slider
              infinite={settings.infinite}
              speed={settings.speed}
              slidesToShow={settings.slidesToShow}
              slidesToScroll={settings.slidesToScroll}
            >
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`md:transition-transform md:transform md:hover:scale-110 md:duration-500 ${
                    window.innerWidth >= 768 ? 'md:w-1/3' : 'w-full'
                  }`}
                >
                  <Link to={`/doctors/${doctor.id}`} className="no-underline">
                    <div className="flex items-center justify-center">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="rounded-full object-cover w-72 h-72 max-[967px]:w-62"
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
            </Slider>
          </div>
        ) : (
          // Display message if no doctors available
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
