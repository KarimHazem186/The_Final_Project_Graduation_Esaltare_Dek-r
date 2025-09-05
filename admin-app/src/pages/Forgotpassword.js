import React,{useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { forgotPassword,resetState } from '../features/auth/authSlice';


// Validation Schema with Yup
let schema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
});

const Forgotpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      dispatch(forgotPassword(values));
      // resetForm(); // 👈 Clear the form after submission
      alert(JSON.stringify(values, null, 2));
    }
    
  });

  const authState = useSelector((state) => state);
  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  
  useEffect(() => {
    if (isSuccess&&user) {
      toast.success('Password reset link sent!');
      formik.resetForm(); // ✅ reset only after success
      dispatch(resetState());
    } else if (isError) {
      toast.error('Failed to send password reset link. Please try again.');
    }
  }, [isError, isSuccess, message]);  

  return (
    <>
      <Meta title="Forgot Password" />
      <ToastContainer />

      <div className='py-4 m-3 align-items-center d-flex justify-content-center' style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <div className='my-5 w-20 bg-white rounded-3 mx-auto p-4' style={{ boxShadow: "1px 4px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <h3>Forgot Password</h3>
          <p style={{ fontSize: "14px", opacity: "0.5" }}>
            Enter the email address associated with your account and we will send a link to reset your password.
          </p>
          
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <CustomInput
                type='email'
                label="Email Address"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <div className="error">
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
            </div>

            <button
              type='submit'
              style={{ backgroundColor: "#08053B" }}
              className='border-0 px-3 py-2 text-white fw-bold w-100'
              disabled={formik.isSubmitting}
            >
              Send Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
