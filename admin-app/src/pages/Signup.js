import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Meta from '../components/Meta';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import {useFormik} from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../features/auth/authSlice';


let schema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name must be at least 2 characters'),
  
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last Name must be at least 2 characters'),

  email: yup
    .string()
    .email('Email should be valid')
    .required('Email is required'),

  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-zA-Z]/, 'Password must contain both letters and numbers'),

  role: yup.string().oneOf(["user", "admin"], "Role is required").required("Role is required"),

});
const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState('user'); // Default role is 'user'

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      role: "user",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // Handle form submission
      // console.log(values);
      dispatch(userRegister({ ...values, rememberMe: isChecked }));
      // dispatch(userRegister(values));
      // alert(JSON.stringify(values, null, 2))
    },
  });

  const authState = useSelector((state) => state);
  // console.log(authState);
  const {user, isLoading, isError, isSuccess, message} = authState.auth;
  // console.log(user);
  

  useEffect(() => {
    if (isSuccess && user) {
      // Show success toast when registration is successful
      toast.success('Registration successful!');
      setTimeout(() => {
        navigate('/'); // Navigate to admin dashboard
      }, 2000);
    } else if (isError) {
      // Show error toast when there is a registration failure
      toast.error(message || 'Registration failed!');
    }
  }, [user, isError, isSuccess, message, navigate]);


  return (
    <>
    <Meta title="Register Admin" />
    <ToastContainer />
    
    <div
      className="py-5 d-flex align-items-center justify-content-center"
      style={{ background: '#FFFFFF', minHeight: '100vh' }}
    >
      <div
        className="my-5 w-20 bg-white rounded-3 mx-auto p-4"
        style={{ boxShadow: '1px 4px 4px 4px rgba(0, 0, 0, 0.1)' }}
      >
        <h3>Sign Up</h3>
        <p style={{ fontSize: '14px', opacity: '0.5' }}>
          Fill out the form to create a new account.
        </p>
        <form onSubmit={formik.handleSubmit} className="w-100">
          <div className="mb-3">
            <CustomInput
              type="text"
              label="First Name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <div className='error'>
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className='text-danger'>{formik.errors.firstName}</div>
            ) : null}
          </div>
          </div>

          <div className="mb-3">
            <CustomInput
              type="text"
              label="Last Name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <div className='error'>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className='text-danger'>{formik.errors.lastName}</div>
            ) : null}
          </div>
          </div>

          <div className='mb-3'>
            <CustomInput
              type="email"
              label="Email Address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <div className='error'>
            {formik.touched.email && formik.errors.email ? (
              <div className='text-danger'>{formik.errors.email}</div>
            ) : null}
          </div>
          </div>

          <div className="mb-3">
            <CustomInput
              type="tel"
              label="Mobile"
              id="mobile"
              name="mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
            />
            <div className='error'>
            {formik.touched.mobile && formik.errors.mobile ? (
              <div className='text-danger'>{formik.errors.mobile}</div>
            ) : null}
          </div>
          </div>

          <div className="mb-3">
            <CustomInput
              type="password"
              label="Password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className='error'>
            {formik.touched.password && formik.errors.password ? (
              <div className='text-danger'>{formik.errors.password}</div>
            ) : null}
          </div>
          </div>

          <div className="mb-3">
              <label htmlFor="role">Role</label>
              <div className=''>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="user"
                    name="role"
                    value="user"
                    checked={formik.values.role === "user"}
                    onChange={() => formik.setFieldValue("role", "user")}
                  />
                  <label className="form-check-label" htmlFor="user">
                    User
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="admin"
                    name="role"
                    value="admin"
                    checked={formik.values.role === "admin"}
                    onChange={() => formik.setFieldValue("role", "admin")}
                  />
                  <label className="form-check-label" htmlFor="admin">
                    Admin
                  </label>
                </div>
              </div>
              <div className='error'>
              {formik.touched.role && formik.errors.role ? (
              <div className='text-danger'>{formik.errors.role}</div>
            ) : null}
          </div>
            </div>


          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              // checked={isChecked}
              // onChange={() => setIsChecked(!isChecked)}
              // required
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              I agree to the{' '}
              <span style={{ color: '#002176' }}>terms and conditions</span>
            </label>
          </div>

          <button
            type="submit"
            style={{ backgroundColor: '#08053B', cursor: 'pointer' }}
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center"
          >
            Sign Up
          </button>
        </form>

        <div className="my-3 text-center">
          <Divider>OR CONTINUE WITH</Divider>
        </div>

        <div className="my-3 d-flex justify-content-center align-items-center">
          <Link
            to="/google-signup"
            className="text-decoration-none text-dark me-5"
            style={{
              backgroundColor: '#EAEAEA',
              padding: '8px 24px',
              boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#D6D6D6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#EAEAEA')}
          >
            Google
          </Link>

          <Link
            to="/facebook-signup"
            className="text-decoration-none text-dark"
            style={{
              backgroundColor: '#EAEAEA',
              padding: '8px 24px',
              boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#D6D6D6')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#EAEAEA')}
          >
            Facebook
          </Link>
        </div>

        <div>
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/" className="text-decoration-none" style={{ color: '#0A3FC4' }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  </>

  );
};

export default Signup;



