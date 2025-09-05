import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createCoupon, resetCouponState } from '../features/coupon/couponSlice';
import Meta from '../components/Meta';

const Newcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, successMessage, error } = useSelector((state) => state.coupon);

  const [couponData, setCouponData] = useState({
    code: '',
    type: 'percentage', // 'percentage' | 'fixed' | 'freeShipping'
    discountValue: '',
    usageLimit: '',
    isRegisteredOnly: false,
    priority: '',
    status: 'Active',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        navigate('/admin/coupons');
      }, 2000);
      formik.resetForm();
      dispatch(resetCouponState());
      setCouponData({
        code: '',
        type: '',
        discountValue: '',
        usageLimit: '',
        isRegisteredOnly:'',
        priority: '',
        status: '',
        startDate: '',
        endDate: '',
      })
    }

    if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  const validationSchema = Yup.object({
    code: Yup.string().required('Coupon Code is required'),
    type: Yup.string().oneOf(['percentage', 'fixed', 'freeShipping']).required('Type is required'),
    discountValue: Yup.number()
      .when('type', {
        is: (val) => val !== 'freeShipping',
        then: (schema) => schema.required('Discount value is required').min(1),
        otherwise: (schema) => schema.notRequired(),
      }),
    usageLimit: Yup.number().min(1, 'Usage limit must be at least 1').required('Usage limit is required'),
    isRegisteredOnly: Yup.boolean(),
    priority: Yup.number().required('Priority is required').min(1),
    status: Yup.string().required('Status is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .min(Yup.ref('startDate'), 'End date must be after start date')
      .required('End date is required'),
  });

  const formik = useFormik({
    initialValues: couponData,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
      dispatch(createCoupon(values));
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    formik.setFieldValue(name, finalValue);
    setCouponData((prev) => ({ ...prev, [name]: finalValue }));
  };


  return (
    <>
  <Meta title="Add Coupon" />
  <div className="container mt-4">
    <form className="card p-4" onSubmit={formik.handleSubmit}>
      <h1 className="mb-4">Add Coupon</h1>
      <div className="row">
        <div className="col-md-8">
          <div className="card p-3 mb-3">
            <h2>Basic Information</h2>

            <div className="mb-3 mt-2">
              <label className="form-label"><strong>Code</strong></label>
              <input
                type="text"
                name="code"
                className="form-control"
                placeholder="QWERTY12"
                value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.code && formik.errors.code && (
                <div className="text-danger small mt-1">{formik.errors.code}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Type</strong></label>
              {[
                { label: 'Percentage', value: 'percentage' },
                { label: 'Fixed Amount', value: 'fixed' },
                { label: 'Free Shipping', value: 'freeShipping' },
              ].map(({ label, value }) => (
                <div className="form-check" key={value}>
                  <input
                    type="radio"
                    id={value}
                    name="type"
                    className="form-check-input"
                    value={value}
                    checked={formik.values.type === value}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label htmlFor={value} className="form-check-label">{label}</label>
                </div>
              ))}
              {formik.touched.type && formik.errors.type && (
                <div className="text-danger small mt-1">{formik.errors.type}</div>
              )}
            </div>

            {formik.values.type !== 'freeShipping' && (
              <div className="mb-3">
                <label className="form-label"><strong>Discount Value</strong></label>
                <input
                  type="number"
                  name="discountValue"
                  className="form-control"
                  placeholder="200.00"
                  value={formik.values.discountValue}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discountValue && formik.errors.discountValue && (
                  <div className="text-danger small mt-1">{formik.errors.discountValue}</div>
                )}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label"><strong>Usage Limit</strong></label>
              <input
                type="number"
                name="usageLimit"
                className="form-control"
                placeholder="100"
                value={formik.values.usageLimit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.usageLimit && formik.errors.usageLimit && (
                <div className="text-danger small mt-1">{formik.errors.usageLimit}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label"><strong>Priority</strong></label>
              <input
                type="number"
                name="priority"
                className="form-control"
                placeholder="Enter priority (e.g., 1, 2, 3...)"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.priority && formik.errors.priority && (
                <div className="text-danger small mt-1">{formik.errors.priority}</div>
              )}
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                id="isRegisteredOnly"
                name="isRegisteredOnly"
                className="form-check-input"
                checked={formik.values.isRegisteredOnly}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="isRegisteredOnly" className="form-check-label">Only for registered customers</label>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="button w-50"
                disabled={formik.isSubmitting || loading || !formik.isValid}
              >
                {loading ? "Adding..." : "Add Coupon"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h2>Status</h2>
            {['Active', 'InActive'].map((status) => (
              <div className="form-check" key={status}>
                <input
                  type="radio"
                  id={status}
                  name="status"
                  className="form-check-input"
                  value={status}
                  checked={formik.values.status === status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor={status} className="form-check-label">{status}</label>
              </div>
            ))}
            {formik.touched.status && formik.errors.status && (
              <div className="text-danger small mt-1">{formik.errors.status}</div>
            )}
          </div>

          <div className="card p-3">
            <h2>Schedule</h2>
            <p>Use these settings to set the coupon expiration date.</p>
            <div className="mb-3">
              <label className="form-label"><strong>Start Date</strong></label>
              <input
                type="date"
                name="startDate"
                className="form-control"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.startDate && formik.errors.startDate && (
                <div className="text-danger small mt-1">{formik.errors.startDate}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label"><strong>End Date</strong></label>
              <input
                type="date"
                name="endDate"
                className="form-control"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.endDate && formik.errors.endDate && (
                <div className="text-danger small mt-1">{formik.errors.endDate}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</>

  );
};

export default Newcoupon;
