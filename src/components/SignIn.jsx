import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signInUser } from '../redux/user/userSlice';

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();

    const patient = {
      email,
      password,
    };

    try {
      // Dispatch the sign-in action
      const response = await dispatch(signInUser({ patient }));

      console.log('res', response.payload); // Log the response to the console

      // Check if the response indicates a successful sign-in
      if (response.payload.code === 200) {
        navigate('/doctors'); // Navigate to the doctors page only if sign-in is successful
      } else {
        // Display an error message if sign-in is not successful
        toast.error('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.log('err', error);
      // Handle other errors, such as network issues or unexpected errors
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-[7rem] ">
      <h1>MDoc Doctor&apos;s Appointment</h1>
      <form
        className="bg-[#c8d5f5] rounded-md shadow py-[7rem] px-[3rem] mt-7"
        onSubmit={handleSignIn}
      >
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
          Sign In
        </button>
      </form>
      <p className="mt-1 font-bold">
        Don&apos;t have an account?
        {' '}
        <Link className="no-underline text-black" to="/">
          Click here to sign_up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
