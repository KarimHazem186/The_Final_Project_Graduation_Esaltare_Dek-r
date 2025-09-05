import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Meta from '../components/Meta';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { adminLogin } from '../features/auth/authSlice';

let schema = yup.object().shape({
  email: yup.string().email('Email Should be valid').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(adminLogin({ ...values }));
      alert(JSON.stringify(values, null, 2))

      // resetForm();
    },
  });
  
  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('Login successful!');
      formik.resetForm(); // ✅ Reset here after success
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } else if (isError) {
      toast.error(message || 'Login failed!');
    }
  }, [user, isError, isSuccess, message, navigate]);
  
  return (
    <>
      <Meta title="Login Admin" />
      <ToastContainer />
      <div className="py-5 align-items-center d-flex justify-content-center" style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <div className="my-5 w-20 bg-white rounded-3 mx-auto p-4" style={{ boxShadow: "1px 4px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <h3>Sign In</h3>
          <p style={{ fontSize: "14px", opacity: "0.5" }}>Log in to your account to continue.</p>

          <div className="error text-center">
            {message === "Rejected" ? "You are not Admin" : ""}
          </div>

          <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <CustomInput
              type="email"
              label="Email Address"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <div className="error" >
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

          </div>

          <div className='mb-3'>

            <CustomInput
              type="password"
              name="password"
              label="Password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>
          </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                // checked={isChecked}
                // onChange={() => setIsChecked(!isChecked)}
                aria-label="Remember me"
                // required
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <div className="mb-3 text-end">
              <Link to="forgot-password" style={{ color: "#0A3FC4" }}>
                Forgot Password?
              </Link>
            </div>

            <button type="submit" style={{ backgroundColor: "#08053B" }} className="border-0 px-3 py-2 text-white fw-bold w-100 text-center">
              Login
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
                backgroundColor: "#EAEAEA",
                padding: "8px 24px",
                boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#D6D6D6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
            >
              Google
            </Link>
            <Link
              to="/facebook-signup"
              className="text-decoration-none text-dark"
              style={{
                backgroundColor: "#EAEAEA",
                padding: "8px 24px",
                boxShadow: "1px 2px 5px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#D6D6D6")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#EAEAEA")}
            >
              Facebook
            </Link>
          </div>

          <div>
            <p className="text-center">
              Don't have an account? <Link to="/signup" className="text-decoration-none" style={{ color: "#0A3FC4" }}>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};


export default Login;
