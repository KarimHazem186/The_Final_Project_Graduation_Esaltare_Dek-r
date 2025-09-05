import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import { ToastContainer, toast } from 'react-toastify';
import Meta from '../components/Meta';
import { getCategory, updateCategory, resetCategoryState } from '../features/category/categorySlice';
import { useNavigate, useParams } from 'react-router-dom';
import { image_url } from '../utils/base_url';

const EditCategory = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error, category } = useSelector((state) => state.category);
  const [previews, setPreviews] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryData, setCategoryData] = useState({
    categoryName: '',
    priority: '',
    description: '',
    status: '',
    images: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getCategory(id));
    }

    if (successMessage) {
      toast.success(successMessage);
      setTimeout(() => {
        navigate('/admin/categories');
      }, 2000);
      dispatch(resetCategoryState());
    }

    if (error) {
      toast.error(error);
    }
  }, [dispatch, id, successMessage, error]);

  useEffect(() => {
    if (category) {
      setCategoryData({
        categoryName: category.categoryName || '',
        priority: category.priority || '',
        description: category.description || '',
        status: category.status || 'Active',
        images: category.images || [],
      });

      const filePreviews = category.images.map((img) => `${image_url}${img.url}`);
      setPreviews(filePreviews);
    }
  }, [category]);

  const validationSchema = Yup.object({
    categoryName: Yup.string().required('Category Name is required'),
    priority: Yup.number().required('Priority is required').min(1, 'Priority must be greater than 0'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('Status is required'),
    images: Yup.array().max(5, 'You can upload up to 5 images'),
  });

  const formik = useFormik({
    initialValues: categoryData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values)
      alert(JSON.stringify(values, null, 2))
      const formData = { ...values, images: categoryData.images };
      dispatch(updateCategory({ categoryId: category._id, categoryData: formData }));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  

  const handleDescriptionChange = (value) => {
    formik.setFieldValue('description', value);
  };


const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  const existingImagesCount = formik.values.images.length;
  const totalNewCount = existingImagesCount + files.length;

  if (totalNewCount > 5) {
    toast.error('You can only upload up to 5 images.');
    return;
  }

  const updatedImages = [...formik.values.images, ...files];
  const filePreviews = files.map((file) => URL.createObjectURL(file));

  formik.setFieldValue('images', updatedImages);
  setPreviews((prev) => [...prev, ...filePreviews]);
};


const handleRemoveImage = (indexToRemove) => {
  const updatedImages = formik.values.images.filter((_, idx) => idx !== indexToRemove);
  const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);

  formik.setFieldValue('images', updatedImages);
  setPreviews(updatedPreviews);
};


// useEffect(() => {
//       return () => {
//         previews.forEach((url) => URL.revokeObjectURL(url));
//       };
//     }, [previews]);

  return (
    <>
      <Meta title="Edit Category" />
      <div className="container mt-4">
        <form className="card p-4" onSubmit={formik.handleSubmit}>
          <h1 className="mb-4">Edit Category</h1>
          <div className="row">
                  {/* Left Side */}
                  <div className="col-md-8 ">
                    <div className="card p-3 mb-3">
                      <h2>Basic Information</h2>
                      
                      {/* Category Name */}
                      <div className="mb-3 mt-2">
                        <label className="form-label"><strong>Category Name</strong></label>
                        <input
                          type="text"
                          name="categoryName"
                          className="form-control"
                          placeholder="Enter category name"
                          value={formik.values.categoryName || '' }
                          onChange={handleChange}
                          // onBlur={formik.handleBlur}
                        />
                        {formik.touched.categoryName && formik.errors.categoryName && (
                          <div className="text-danger">{formik.errors.categoryName}</div>
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
          
          
                      {/* Description */}
                      <div className="mb-3">
                        <label className="form-label"><strong>Description</strong></label>
                        <ReactQuill
                          className="quill-editor"
                          value={formik.values.description}
                          onChange={handleDescriptionChange}
                          style={{ height: "200px" }}
                        />
                        {formik.touched.description && formik.errors.description && (
                          <div className="text-danger">{formik.errors.description}</div>
                        )}
                      </div>
          
                      {/* Submit */}
                      <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="button w-50" 
                              disabled={formik.isSubmitting || loading || !formik.isValid}
                              >
                          {loading ? "Updating..." : "Update Category"}
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
                              width: "100%",
                              height: previews.length > 0 ? "450px" : "300px",  // زيادة الارتفاع عند تحميل الصور
                              cursor: "pointer",
                              paddingBottom: previews.length > 0 ? "100px" : "50px",  // زيادة المساحة أسفل الحقل عند تحميل الصور
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
                                style={{ width: "43%", opacity: "0.6" }}
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
                                        width: "100px",
                                        height: "100px",
                                        objectFit: "cover",
                                        marginBottom: "15px", // زيادة المسافة بين الصور
                                      }}
                                    />
                                    <button
                                      type="button"
                                      className="btn-close position-absolute top-0 end-0"
                                      style={{ backgroundColor: "white", borderRadius: "50%" }}
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

export default EditCategory;
