import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { getAllSubcategories } from '../features/subcategory/subcategorySlice';
import { createProduct, resetProductState } from '../features/product/productSlice';
import { useFormik } from 'formik';

const Newproduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, successMessage, error } = useSelector((state) => state.product); // Adjust slice name


   const { subcategories } = useSelector((state) => state.subcategory); // adjust if your slice is named differently
    
   useEffect(()=>{
    dispatch(getAllSubcategories());
   },[])
   
      
      const [productData, setProductData] = useState({
        productName: '',         
        priority: '',
        description: '',
        price: '',
        quantity: '',
        length: '',
        width: '',
        height: '',
        status: 'Active',
        subcategoryId: '',       
        images: []           
      });
      
      const [previews, setPreviews] = useState([]);

      
      
      
      useEffect(() => {
        if (successMessage) {
          toast.success(successMessage);
          setTimeout(() => navigate('/admin/products'), 2000);
    
          formik.resetForm();
          dispatch(resetProductState());
          setProductData({
            productName: '',
            priority: '',
            description: '',
            price: '',
            quantity: '',
            length: '',
            width: '',
            height: '',
            status: 'Active',
            subcategoryId: '',
            images: []
          });
        }
    
        if (error) {
          toast.error(error);
        }
      }, [successMessage, error]);
    
      const validationSchema = Yup.object({
        productName: Yup.string().required('Product Name is required'),
        priority: Yup.number().required('Priority is required').min(1, 'Must be greater than 0'),
        price: Yup.number().required('Price is required'),
        length: Yup.number().required('Length is required'),
        width: Yup.number().required('Width is required'),
        height: Yup.number().required('Height is required'),
        subcategoryId: Yup.string().required('Subcategory is required'),
        status: Yup.string().required('Status is required'),
        images: Yup.array().min(1, 'At least 1 image is required').max(5, 'You can upload up to 5 images')
      });
    
      const formik = useFormik({
        initialValues: productData,
        validationSchema,
        onSubmit: (values) => {
          const formData = {
            ...values,
            images: productData.images
          };
          dispatch(createProduct(formData));
        }
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, value);
        setProductData((prev) => ({ ...prev, [name]: value }));
      };
    
      const handleDescriptionChange = (value) => {
        formik.setFieldValue('description', value);
        setProductData((prev) => ({ ...prev, description: value }));
      };


      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
      
        
        if (files.length + productData.images.length > 5) {
          toast.error("You can only upload up to 5 images.");
          return;
        }
      
        
        const updatedImages = [...productData.images, ...files];
        setProductData((prev) => ({ ...prev, images: updatedImages }));
      
        setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);     
        formik.setFieldValue("images", updatedImages);
      };
      
      const handleRemoveImage = (indexToRemove) => {
        
        const updatedImages = productData.images.filter((_, idx) => idx !== indexToRemove);
        const updatedPreviews = previews.filter((_, idx) => idx !== indexToRemove);
      
        
        setProductData((prev) => ({ ...prev, images: updatedImages }));
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
        <Meta title="Add Product" />
      
        <div className="container mt-4">
          <form
            className="card p-4"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            <h1 className="mb-4">Add Product</h1>
      
            <div className="row">
              {/* Left Side */}
              <div className="col-md-8">
                <div className="card p-3 mb-3">
                  <h2>Basic Information</h2>
      
                  {/* Product Name */}
                  <div className="mb-3 mt-2">
                    <label className="form-label">
                      <strong>Product Name</strong>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      placeholder="Enter product name"
                      value={formik.values.productName}
                      onChange={handleChange}
                    />
                    {formik.touched.productName && formik.errors.productName && (
                      <div className="text-danger">{formik.errors.productName}</div>
                    )}
                  </div>
      
                  {/* Dimensions */}
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">
                        <strong>Length</strong>
                      </label>
                      <input
                        type="number"
                        name="length"
                        className="form-control"
                        placeholder="Enter length"
                        value={formik.values.length}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.length && formik.errors.length && (
                        <div className="text-danger">{formik.errors.length}</div>
                      )}
                    </div>
      
                    <div className="col-md-4">
                      <label className="form-label">
                        <strong>Width</strong>
                      </label>
                      <input
                        type="number"
                        name="width"
                        className="form-control"
                        placeholder="Enter width"
                        value={formik.values.width}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.width && formik.errors.width && (
                        <div className="text-danger">{formik.errors.width}</div>
                      )}
                    </div>
      
                    <div className="col-md-4">
                      <label className="form-label">
                        <strong>Height</strong>
                      </label>
                      <input
                        type="number"
                        name="height"
                        className="form-control"
                        placeholder="Enter height"
                        value={formik.values.height}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.height && formik.errors.height && (
                        <div className="text-danger">{formik.errors.height}</div>
                      )}
                    </div>
                  </div>
                </div>
      
                {/* Subcategory */}
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Subcategory (with Category)</strong>
                  </label>
                  <select
                    name="subcategoryId"
                    className="form-control"
                    value={formik.values.subcategoryId}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select a subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.subcategoryName} ({sub.categoryId?.categoryName || "No Category"})
                      </option>
                    ))}
                  </select>
                  {formik.touched.subcategoryId && formik.errors.subcategoryId && (
                    <div className="text-danger">{formik.errors.subcategoryId}</div>
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
      
                {/* Price */}
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Price</strong>
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter product price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-danger">{formik.errors.price}</div>
                  )}
                </div>

                    {/* Quantity */}
                <div className="mb-3">
                <label className="form-label">
                    <strong>Quantity</strong>
                </label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    placeholder="Enter quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                    <div className="text-danger">{formik.errors.quantity}</div>
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
                    style={{ height: "200px" }}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-danger">{formik.errors.description}</div>
                  )}
                </div>
      
                {/* Submit */}
                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="submit"
                    className="button w-50 mt-3"
                    disabled={formik.isSubmitting || loading || !formik.isValid}
                  >
                    {loading ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </div>
      
              {/* Right Side */}
              <div className="col-md-4">
                <div className="card p-3 mb-3">
                  <h2>Status</h2>
                  {["Active", "InActive"].map((status) => (
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
                      width: "100%",
                      height: previews.length > 0 ? "450px" : "300px",
                      cursor: "pointer",
                      paddingBottom: previews.length > 0 ? "100px" : "50px",
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
                                marginBottom: "15px",
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
      
  )
}

export default Newproduct;