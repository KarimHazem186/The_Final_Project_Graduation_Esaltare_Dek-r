import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, resetPostState } from '../features/post/postSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Newpost = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, error } = useSelector((state) => state.post);
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    postTitle: '',
    priority: '',
    description: '',
    status: 'Active',
    images: [], // changed from single `image` to `images`
  });

  const [previews, setPreviews] = useState([]);


  useEffect(() => {
      if (successMessage) {
        toast.success(successMessage);
        setTimeout(()=>{
          navigate('/admin/posts')
        },2000)
        formik.resetForm(); // Reset form values
        dispatch(resetPostState());
        setPostData({
          postTitle: '',
          priority: '',
          description: '',
          status: '',
          images: []
        });
        setPreviews([]); // Clear image previews
      }
    
      if (error) {
        toast.error(error);
      }
    }, [successMessage, error]);


    const validationSchema = Yup.object({
        postTitle: Yup.string().required('Post Title is required'),
        priority: Yup.number().required('Priority is required').min(1, 'Priority must be greater than 0'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        images: Yup.array()
          .min(1, 'At least 1 image is required')
          .max(5, 'You can upload up to 5 images')
      });


      const formik = useFormik({
          initialValues: postData,
          // enableReinitialize: true,
          validationSchema,
          onSubmit: (values) => {
            const formData = {
              ...values,
              images: postData.images
            };
            dispatch(createPost(formData));
          }
          
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          formik.setFieldValue(name, value);
          setPostData((prev) => ({ ...prev, [name]: value }));
        };
        
      
        const handleDescriptionChange = (value) => {
          formik.setFieldValue("description", value);
        };
        
        const handleImageChange = (e) => {
          const files = Array.from(e.target.files);
          
          if (files.length + postData.images.length > 5) {
            toast.error("You can only upload up to 5 images.");
            return;
          }
        
          // Append the new images to the existing images
          const updatedImages = [...postData.images, ...files];
          setPostData((prev) => ({ ...prev, images: updatedImages }));
        
          // Create previews for the new images
          const filePreviews = files.map((file) => URL.createObjectURL(file));
          setPreviews((prev) => [...prev, ...filePreviews]);
        
          formik.setFieldValue("images", updatedImages);
        };
      
        const handleRemoveImage = (indexToRemove) => {
          const updatedImages = postData.images.filter((_, idx) => idx !== indexToRemove);
          const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);
        
          setPostData((prev) => ({ ...prev, images: updatedImages }));
          setPreviews(updatedPreviews);
          formik.setFieldValue("images", updatedImages);
        };
        

      useEffect(() => {
          return () => {
            previews.forEach((url) => URL.revokeObjectURL(url));
          };
       }, [previews]);
        
    

  return (
    <>
    <Meta title="Add Post" />
    <div className="container mt-4">
      <form className="card p-4" onSubmit={formik.handleSubmit}>
        <h1 className="mb-4">Add Post</h1>
        <div className="row">
          {/* Left Side */}
          <div className="col-md-8">
            <div className="card p-3 mb-3">
              <h2>Basic Information</h2>

              {/* Post Title */}
              <div className="mb-3 mt-2">
                <label className="form-label"><strong>Post Title</strong></label>
                <input 
                  type="text" 
                  name="postTitle" 
                  className="form-control" 
                  placeholder="Enter post title" 
                  value={formik.values.postTitle}
                  onChange={handleChange} 
                   
                />
                {formik.touched.postTitle && formik.errors.postTitle && (
                  <div className="text-danger">{formik.errors.postTitle}</div>
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
                  disabled={formik.isSubmitting || loading || !formik.isValid || formik.isValidating}
                  >
                  {loading ? "Adding..." : "Add Post"}
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

export default Newpost;