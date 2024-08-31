
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import ClipLoader from "react-spinners/ClipLoader";

import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../Contexts/AuthContext';
export default function Login() {
  
  const [errorMsg, seterrorMsg] = useState('');
const [successMsg, setsuccessMsg] = useState('');
const navigate =useNavigate()
 const [isLoading, setisLoading] = useState(false)
 let {setUserToken}= useContext(AuthContext)
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter valid email'),
    password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Minimum eight characters, at least one letter, one number and one special character'),
  });

  const { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  async function onSubmit() {
    // setisLoading(true)
    seterrorMsg('');
    setsuccessMsg('');
    setisLoading(true)
   await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({data})=>{
    setisLoading(false)
    console.log(data);
    setsuccessMsg(data.message)
    setUserToken(data.token);
    localStorage.setItem("token", data.token)
  // setTimeout(() => {
  //   navigate('/')
  // }, 500);
    if (location.pathname == "/login"){
      navigate('/')
    }else{
      navigate(location.pathname)

    }
    
  }).catch((err)=>{
    setisLoading(false)
  console.log(err.response.data.message);
  seterrorMsg(err.response.data.message)
  
  })
    // let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
    // setisLoading(false)
    // console.log(data);
  }

  return (
    <>
      <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My Company</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex items-start flex-col justify-start">
            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              value={values.email}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
            {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              value={values.password}
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
            />
            {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
          </div>

          <button type="submit" className="bg-[#027d02] hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>Login
          {isLoading &&    <ClipLoader
       
       size={10}
       aria-label="Loading Spinner"
       data-testid="loader"
     />}
          
          
          </button>
          {errorMsg && <p className='text-red-500'>{errorMsg}</p>}      
  {successMsg && <p className='text-green-500'>{successMsg}</p>}
        </form>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
          <Link to="/register" className="text-[#027d02] hover:text-[#027d02]">
            Register 
          </Link>
        </div>
      </div>
    </>
  );
}
// import { useFormik } from 'formik'
// import * as yup from 'yup'

// import axios from 'axios'
// import { useContext, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { ColorRing } from 'react-loader-spinner'
// import AuthContext, { AuthContext } from '../../Contexts/AuthContext'
// import { CartContext } from '../../Contexts/CartContext'

// export default function Login() {
//   const { setToken } = useContext(AuthContext);
//   const { getUserCart } = useContext(CartContext);
//   const navigate = useNavigate();
//   const [errorMessage, setErrorMessage] = useState(null);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [isClicked, setIsClicked] = useState(false);
//   const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
//   const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

//   const loginUser = async (values) => {
//     setIsClicked(true);
//     try {
//       const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
//       setToken(response.data.token);
//       localStorage.setItem('token', response.data.token);
//       setIsSuccess(true);
//       setTimeout(() => {
//         navigate('/');
//       }, 2000);
//       getUserCart();
//     } catch (error) {
//       setErrorMessage(error.response.data.message);
//       setIsClicked(false);
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 2000);
//     }
//   };

//   const registerFormik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     onSubmit: loginUser,
//     validationSchema: yup.object().shape({
//       email: yup.string().email('Invalid value').required('Email is required'),
//       password: yup.string().min(6, 'Password must be at least 6 characters').max(12, 'Password must be less than 12 characters').required('Password is required'),
//     }),
//   });

//   const forgotPasswordFormik = useFormik({
//     initialValues: { email: '' },
//     onSubmit: async (values) => {
//       setIsSubmittingPassword(true);
//       try {
//         await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
//         alert("Password reset link sent to your email.");
//         navigate('/change-password'); 
//       } catch (error) {
//         alert("Error sending reset link. Please try again.");
//       } finally {
//         setIsSubmittingPassword(false);
//       }
//     },
//     validationSchema: yup.object().shape({
//       email: yup.string().email('Invalid email').required('Email is required'),
//     }),
//   });

//   return (
//     <div className='p-5 pt-12'>
//       {isSuccess && (
//         <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
//           Welcome back
//         </div>
//       )}
//       {errorMessage && (
//         <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//           {errorMessage}
//         </div>
//       )}

//       {!isForgotPasswordClicked ? (
//         <>
//           <h2 className='text-center'>Login Now</h2>
//           <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto">
//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 value={registerFormik.values.email}
//                 onChange={registerFormik.handleChange}
//                 onBlur={registerFormik.handleBlur}
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="email"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Email:
//               </label>
//               {registerFormik.errors.email && registerFormik.touched.email && (
//                 <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                   {registerFormik.errors.email}
//                 </div>
//               )}
//             </div>

//             <div className="relative z-0 w-full mb-5 group">
//               <input
//                 type="password"
//                 value={registerFormik.values.password}
//                 onChange={registerFormik.handleChange}
//                 onBlur={registerFormik.handleBlur}
//                 name="password"
//                 id="password"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                 placeholder=" "
//                 required
//               />
//               <label
//                 htmlFor="password"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Password:
//               </label>
//               {registerFormik.errors.password && registerFormik.touched.password && (
//                 <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                   {registerFormik.errors.password}
//                 </div>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               {!isClicked ? 'Login' : (
//                 <ColorRing
//                   visible={true}
//                   height="40"
//                   width="40"
//                   ariaLabel="color-ring-loading"
//                   wrapperStyle={{}}
//                   wrapperClass="color-ring-wrapper"
//                   colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
//                 />
//               )}
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <button
//               onClick={() => setIsForgotPasswordClicked(true)}
//               className="text-blue-700 hover:underline"
//             >
//               Forgot Password?
//             </button>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={forgotPasswordFormik.handleSubmit} className="max-w-md mx-auto mt-5">
//           <div className="relative z-0 w-full mb-5 group">
//             <input
//               value={forgotPasswordFormik.values.email}
//               onChange={forgotPasswordFormik.handleChange}
//               onBlur={forgotPasswordFormik.handleBlur}
//               type="email"
//               name="email"
//               id="forgot-email"
//               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//               placeholder=" "
//               required
//             />
//             <label
//               htmlFor="forgot-email"
//               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//             >
//               Email:
//             </label>
//             {forgotPasswordFormik.errors.email && forgotPasswordFormik.touched.email && (
//               <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
//                 {forgotPasswordFormik.errors.email}
//               </div>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             {isSubmittingPassword ? 'Sending...' : 'Send Reset Link'}
//           </button>
//           <div className="text-center mt-4">
//             <button
//               onClick={() => setIsForgotPasswordClicked(false)}
//               className="text-blue-700 hover:underline"
//             >
//               Back to Login
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// }