import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../components/Meta';
import { createAnnouncement, resetAnnouncementState } from '../features/announcement/announcementSlice';
import { useNavigate } from 'react-router-dom';

const Newannouncement = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.announcement);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    announcementTitle: '',
    priority: '',
    percentage: '',
    status: 'Active',
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        navigate('/admin/announcements');
      }, 2000);
      formik.resetForm();
      dispatch(resetAnnouncementState());
      setFormData({
        announcementTitle: '',
        priority: '',
        percentage: '',
        status: '',
        images: [],
      });
      setPreviews([]);
    }

    if (error) {
      toast.error(error);
    }
  }, [successMessage, error]);

  const validationSchema = Yup.object({
    announcementTitle: Yup.string().required('Title is required'),
    priority: Yup.number().required('Priority is required').min(1, 'Must be greater than 0'),
    percentage: Yup.number().required('Percentage is required').min(0).max(100),
    status: Yup.string().required('Status is required'),
    images: Yup.array()
      .min(1, 'At least 1 image is required')
      .max(5, 'Maximum 5 images allowed'),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        images: formData.images,
      };
      dispatch(createAnnouncement(data));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      toast.error('You can only upload up to 5 images.');
      return;
    }

    const updatedImages = [...formData.images, ...files];
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews((prev) => [...prev, ...filePreviews]);
    formik.setFieldValue('images', updatedImages);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews(updatedPreviews);
    formik.setFieldValue('images', updatedImages);
  };

  return (
    <>
      <Meta title="New Announcement" />
      <div className="container mt-4">
        <form className="card p-4" onSubmit={formik.handleSubmit}>
          <h1 className="mb-4">Add New Announcement</h1>
          <div className="row">
            {/* Left Side */}
            <div className="col-md-8">
              <div className="card p-3 mb-3">
                <h2>Basic Information</h2>

                {/* Title */}
                <div className="mb-3 mt-2">
                  <label className="form-label"><strong>Title</strong></label>
                  <input
                    type="text"
                    name="announcementTitle"
                    className="form-control"
                    placeholder="Enter announcement title"
                    value={formik.values.announcementTitle}
                    onChange={handleChange}
                  />
                  {formik.touched.announcementTitle && formik.errors.announcementTitle && (
                    <div className="text-danger">{formik.errors.announcementTitle}</div>
                  )}
                </div>

                {/* Announcement Percentage */}
                <div className="mb-3">
                  <label className="form-label"><strong>Percentage</strong></label>
                  <input
                    type="number"
                    name="percentage"
                    className="form-control"
                    placeholder="Enter discount percentage"
                    value={formik.values.percentage}
                    onChange={handleChange}
                  />
                  {formik.touched.percentage && formik.errors.percentage && (
                    <div className="text-danger">{formik.errors.percentage}</div>
                  )}
                </div>

                {/* Priority */}
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
                    <div className="text-danger">{formik.errors.priority}</div>
                  )}
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="submit"
                    className="button w-50"
                    disabled={formik.isSubmitting || loading || !formik.isValid}
                  >
                    {loading ? 'Submitting...' : 'Add Announcement'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side */}
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
                    />
                    <label htmlFor={status} className="form-check-label">
                      {status}
                    </label>
                  </div>
                ))}
                {formik.touched.status && formik.errors.status && (
                  <div className="text-danger">{formik.errors.status}</div>
                )}
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label"><strong>Images</strong></label>
                <div
                  className="border rounded p-3 d-flex align-items-center justify-content-center position-relative"
                  style={{
                    width: '100%',
                    height: previews.length > 0 ? '450px' : '300px',
                    cursor: 'pointer',
                    paddingBottom: previews.length > 0 ? '100px' : '50px',
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="position-absolute w-100 h-100 opacity-0"
                    onChange={handleImageChange}
                  />
                  {previews.length === 0 ? (
                    <img
                      src="/upload.png"
                      alt="Upload"
                      className="img-fluid mt-3"
                      style={{ width: '43%', opacity: '0.6' }}
                    />
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {previews.map((src, idx) => (
                        <div key={idx} className="position-relative">
                          <img
                            src={src}
                            alt={`Preview ${idx}`}
                            className="img-thumbnail"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '15px' }}
                          />
                          <button
                            type="button"
                            className="btn-close position-absolute top-0 end-0"
                            style={{ backgroundColor: 'white', borderRadius: '50%' }}
                            onClick={() => handleRemoveImage(idx)}
                          ></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {formik.touched.images && formik.errors.images && (
                  <div className="text-danger">{formik.errors.images}</div>
                )}
              </div>
            </div>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Newannouncement;
