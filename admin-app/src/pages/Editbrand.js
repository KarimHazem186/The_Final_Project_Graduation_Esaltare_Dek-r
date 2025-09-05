import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../components/Meta';
import { getBrand, updateBrand, resetBrandState } from '../features/brand/brandSlice';
import { useNavigate, useParams } from 'react-router-dom';
import {  image_url } from '../utils/base_url';

const EditBrand = ({ match }) => {
  const dispatch = useDispatch();
  const { loading, successMessage, error, brand } = useSelector((state) => state.brand);
  console.log(brand)
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();
  
  // const brandId = match.params.id;  // Assuming you're passing the brandId as a URL param
  const { id } = useParams();

  const [brandData, setBrandData] = useState({
    brandName: '',
    priority: '',
    description: '',
    status: '',
    images: [],
  });

  // Fetch brand details when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getBrand(id)); // Fetch brand data
    }
  
    if (successMessage) {
      toast.success(successMessage);
      setTimeout(()=>{
        navigate('/admin/brands')
      },2000)
      dispatch(resetBrandState());
    }
  
    if (error) {
      toast.error(error);
      console.log(error)
    }
  }, [dispatch, id, successMessage, error]);
  
  useEffect(() => {
    if (brand) {
      console.log(brand.images); // Log the brand data for inspection
  
      setBrandData({
        brandName: brand.brandName || '', // Default value if undefined
        priority: brand.priority || '',    // Default value if undefined
        description: brand.description || '', // Default value if undefined
        status: brand.status || 'Active', // Default value if undefined
        images: brand.images || [], // Default empty array if undefined
      });
  
      const filePreviews = brand.images.map((img) => `${image_url}${img.url}`);
      console.log(filePreviews); // Log the preview URLs for inspection
      setPreviews(filePreviews);
    }
  }, [brand]); // Dependency on 'brand'
  
  
  const validationSchema = Yup.object({
    brandName: Yup.string().required('Brand Name is required'),
    priority: Yup.number().required('Priority is required').min(1, 'Priority must be greater than 0'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    images: Yup.array().max(5, 'You can upload up to 5 images'),
  });

  const formik = useFormik({
    initialValues: brandData,
    validationSchema,
    enableReinitialize: true, // Ensure the form is reset with new brand data on re-render
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
      const formData = {
        ...values,
        images: brandData.images,

      };
      dispatch(updateBrand({ brandId: brand._id, brandData: formData }));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (value) => {
    formik.setFieldValue('description', value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
  
    const existingImagesCount = brandData.images.length;
    const totalNewCount = existingImagesCount + files.length;
  
    if (totalNewCount > 5) {
      toast.error('You can only upload up to 5 images.');
      return;
    }
  
    // Append new files to existing image list
    const updatedImages = [...brandData.images, ...files];
    const filePreviews = files.map((file) => URL.createObjectURL(file));
  
    setBrandData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews((prev) => [...prev, ...filePreviews]);
  
    formik.setFieldValue('images', updatedImages);
  };
  
  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = brandData.images.filter((_, idx) => idx !== indexToRemove);
    const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);
  
    setBrandData((prev) => ({ ...prev, images: updatedImages }));
    setPreviews(updatedPreviews);
    formik.setFieldValue('images', updatedImages);
  };
  

  return (
    <>
      <Meta title="Edit Brand" />
      <div className="container mt-4">
        <form className="card p-4" onSubmit={formik.handleSubmit}>
          <h1 className="mb-4">Edit Brand</h1>
          <div className="row">
            {/* Left Side */}
            <div className="col-md-8">
              <div className="card p-3 mb-3">
                <h2>Basic Information</h2>

                {/* Brand Name */}
                <div className="mb-3 mt-2">
                  <label className="form-label">
                    <strong>Brand Name</strong>
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    className="form-control"
                    placeholder="Enter brand name"
                    value={formik.values.brandName || ''}
                    onChange={handleChange}
                  />
                  {formik.touched.brandName && formik.errors.brandName && (
                    <div className="text-danger">{formik.errors.brandName}</div>
                  )}
                </div>

                {/* Priority */}
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Priority</strong>
                  </label>
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

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Description</strong>
                  </label>
                  <ReactQuill
                    className="quill-editor"
                    value={formik.values.description}
                    onChange={handleDescriptionChange}
                    style={{ height: '200px' }}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-danger">{formik.errors.description}</div>
                  )}
                </div>

                {/* Submit */}
                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="submit"
                    className="button w-50"
                    disabled={formik.isSubmitting || loading || !formik.isValid}
                  >
                    {loading ? 'Updating...' : 'Update Brand'}
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
                <label className="form-label">
                  <strong>Images</strong>
                </label>
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
                            style={{
                              width: '100px',
                              height: '100px',
                              objectFit: 'cover',
                              marginBottom: '15px',
                            }}
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

export default EditBrand;
