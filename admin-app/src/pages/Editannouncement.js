import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../components/Meta';
import { updateAnnouncement, getAnnouncementById, resetAnnouncementState, getAnnouncement } from '../features/announcement/announcementSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { image_url } from '../utils/base_url';

const Editannouncement = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error, announcement } = useSelector((state) => state.announcement);
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    announcementTitle: '',
    priority: '',
    percentage: '',
    status: 'Active',
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    dispatch(getAnnouncement(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (announcement) {
      setFormData({
        announcementTitle: announcement.announcementTitle || '',
        percentage: announcement.percentage || '',
        priority: announcement.priority || '',
        status: announcement.status || '',
        images: announcement.images || [],
      });
  
      const filePreviews = announcement.images.map((img) => `${image_url}${img.url}`);
      setPreviews(filePreviews);
    }
  }, [announcement]);
  
  // التعامل مع النجاح أو الخطأ بعد محاولة التحديث
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
  
      // إعادة تعيين فورميك بالقيم الفارغة
      formik.resetForm({
        values: {
          announcementTitle: '',
          percentage: '',
          priority: '',
          status: '',
          images: []
        }
      });
  
      // مسح الصور والمعاينات من الحالة المحلية
      setPreviews([]);
      setFormData({
        announcementTitle: '',
        percentage: '',
        priority: '',
        status: '',
        images: []
      });
  
      // إعادة التوجيه بعد فترة قصيرة
      setTimeout(() => {
        navigate('/admin/announcements');
      }, 2000);
  
      dispatch(resetAnnouncementState());
    }
  
    if (error) {
      toast.error(error);
    }
  }, [successMessage, error, dispatch, navigate]);
  
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
    initialValues: {
      announcementTitle: announcement?.announcementTitle || '',
      priority: announcement?.priority || '',
      percentage: announcement?.percentage || '',
      status: announcement?.status || '',
      images: announcement?.images || [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateAnnouncement({ announcementId: id, data: values }));
    },
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    // setFormData((prev) => ({ ...prev, [name]: value }));
  };

 

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    // Get existing images count from Formik values
    const existingImagesCount = formik.values.images?.length || 0;
    const totalNewCount = existingImagesCount + files.length;
  
    if (totalNewCount > 5) {
      toast.error('You can only upload up to 5 images.');
      return;
    }
  
    // Update images in Formik values
    const updatedImages = [...formik.values.images, ...files];
    const filePreviews = files.map((file) => URL.createObjectURL(file));
  
    // Update state without affecting other form fields
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews((prev) => [...prev, ...filePreviews]);
  
    // Update Formik field value for images
    formik.setFieldValue('images', updatedImages);
  };
  
  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = formik.values.images.filter((_, idx) => idx !== indexToRemove);
    const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);
  
    // Update state without affecting other form fields
    setFormData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews(updatedPreviews);
  
    // Update Formik field value for images
    formik.setFieldValue('images', updatedImages);
  };
  
  return (
    <>
      <Meta title="Edit Announcement" />
      <div className="container mt-4">
        <form className="card p-4" onSubmit={formik.handleSubmit}>
          <h1 className="mb-4">Edit Announcement</h1>
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
                    onChange={formik.handleChange}
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
                    onChange={formik.handleChange}
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
                    // onBlur={formik.handleBlur}
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
                    {loading ? 'Updating...' : 'Update Announcement'}
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

export default Editannouncement;
