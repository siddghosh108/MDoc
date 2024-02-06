import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUpUser } from '../redux/user/userSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      return toast.error('Please fill in all fields');
    }

    const patient = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    try {
      dispatch(signUpUser({ patient }));
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      navigate('/doctors');
    } catch (err) {
      toast.error('Sign Up Error:', err);
    }

    return null;
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[7rem] bg-[url('../public/SignUp.jpg')] h-full w-full object-fit">
      <h1>MDoc Doctor&apos;s Appointment</h1>
      <form
        className="bg-[#c8e5f5] rounded-md shadow py-[7rem] px-[3rem] mt-7"
        onSubmit={handleSignUp}
      >
        <div className="">
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-[100%] text-[#0a1214] first-letter:text-[16px] rounded-md py-[.7rem] px-[1.5rem] mb-4 border-none"
            placeholder="Enter your first name"
          />
        </div>
        <div className="">
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-[100%] text-[#090f11] first-letter:text-[16px] rounded-md py-[.7rem] px-[1.5rem] mb-4 border-none"
            placeholder="Enter your last name"
          />
        </div>
        <div className="">
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[100%] text-[#081012] first-letter:text-[16px] rounded-md py-[.7rem] px-[1.5rem] mb-4 border-none"
            placeholder="Enter your Email"
          />
        </div>
        <div className="">
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] text-[#020405] first-letter:text-[16px] rounded-md py-[.7rem] px-[1.5rem] mb-4 border-none"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="bg-lime-500 w-[100%] hover:bg-[#0F0F0F] font-bold px-3 py-1 rounded-md text-white"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-1 font-bold">
        have an account?
        {' '}
        <Link className="no-underline text-black" to="/signin">
          Click here to log in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
