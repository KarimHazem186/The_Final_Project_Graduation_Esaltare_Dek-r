import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// Create Product
const createProduct = async (productData) => {
  const {
    productName,
    description,
    length,
    width,
    height,
    price,
    priority,
    subcategoryId,
    quantity,
    status,
    images,
  } = productData;

  const formData = new FormData();
  formData.append('productName', productName);
  formData.append('description', description);
  formData.append('length', length);
  formData.append('width', width);
  formData.append('height', height);
  formData.append('price', price);
  formData.append('priority', priority);
  formData.append('subcategoryId', subcategoryId);
  formData.append('quantity', quantity);
  formData.append('status', status);

  images.forEach(image => {
    formData.append('images', image);
  });

  try {
    const response = await axios.post(base_url + 'product/create-product', formData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update Product
const updateProduct = async (productId, productData) => {
  const formData = new FormData();

  formData.append('productName', productData.productName);
  formData.append('description', productData.description);
  formData.append('length', productData.length);
  formData.append('width', productData.width);
  formData.append('height', productData.height);
  formData.append('price', productData.price);
  formData.append('priority', productData.priority);
  formData.append('subcategoryId', productData.subcategoryId);
  formData.append('quantity', productData.quantity);
  formData.append('status', productData.status);

  productData.images.forEach(img => {
    if (img instanceof File) {
      formData.append('images', img);
    }
  });

  const oldImages = productData.images.filter(img => !(img instanceof File));
  formData.append('oldImages', JSON.stringify(oldImages));

  try {
    const response = await axios.put(`${base_url}product/update-product/${productId}`, formData, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Get Single Product
const getProduct = async (productId) => {
  try {
    const response = await axios.get(base_url + `product/get-product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Products
const getAllProducts = async () => {
  try {
    const response = await axios.get(base_url + 'product/all-products');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Product
const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(base_url + `product/delete-product/${productId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Export service
const productService = {
  createProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
};

export default productService;
