


import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { resetPassword } from '../features/auth/authSlice';

// Validation Schema with Yup
let schema = yup.object().shape({
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmpassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Resetpassword = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
    
  // Formik setup
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmpassword: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log("Form Values:", values); // Check the values you are submitting
      dispatch(resetPassword({ token, ...values }));
      alert(JSON.stringify(values, null, 2))
    },
  });

  // Get state from Redux store
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully!');
      setTimeout(() => {
        navigate('/'); // Redirect to login after success
      }, 2000);
    } else if (isError) {
      toast.error(message || 'Failed to update password. Please try again.');
      // Optionally, allow user to retry without redirecting immediately
    }
  }, [isSuccess, isError, message, navigate]);

  return (
    <>
      <Meta title="Reset Password" />
      <ToastContainer />

      <div className="py-4 m-3 align-items-center d-flex justify-content-center" style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <div className="my-5 w-20 bg-white rounded-3 mx-auto p-4" style={{ boxShadow: "1px 4px 4px 4px rgba(0, 0, 0, 0.1)" }}>
          <h3>Set a New Password</h3>
          <p style={{ fontSize: "14px", opacity: "0.5" }}>Create a new password. Ensure it is different from the previous password.</p>

          <form onSubmit={formik.handleSubmit}>
            <div className='mb-3'>
              <CustomInput
                type="password"
                label="New Password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <div className='error'>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
            </div>

            <div className='mb-2'>   
              <CustomInput
                type="password"
                label="Confirm Password"
                id="confirmpassword"
                name="confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
              />
              <div className='error'>
                {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                  <div className="text-danger">{formik.errors.confirmpassword}</div>
                )}
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: "#08053B" }}
              className="border-0 px-3 py-2 text-white fw-bold w-100"
              disabled={formik.isSubmitting || isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Resetpassword;

