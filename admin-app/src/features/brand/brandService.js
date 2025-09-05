import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// Create Brand
const createBrand = async (brandData) => {
  const { brandName, priority, description, status, images } = brandData;
  const formData = new FormData();

  // Append all the form data (including images)
  formData.append('brandName', brandName);
  formData.append('priority', priority);
  formData.append('description', description);
  formData.append('status', status);
  images.forEach(image => formData.append('images', image));

  try {
    const response = await axios.post(base_url + 'brand/create-brand', formData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Function to update brand data
const updateBrand = async (brandId, brandData) => {
  try {
    // Create FormData object to send the brand data
    const formData = new FormData();

    // Append brand data to FormData
    formData.append('brandName', brandData.brandName);
    formData.append('priority', brandData.priority);
    formData.append('description', brandData.description);
    formData.append('status', brandData.status);

    // Loop through images and append them to FormData
    // if (brandData.images && brandData.images.length > 0) {
    //   brandData.images.forEach(image => formData.append('images', image));
    // }

    brandData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append('images', img);
        }
    });
      
    const oldImages = brandData.images.filter(img => !(img instanceof File));
    formData.append('oldImages', JSON.stringify(oldImages));


    // Make the API request to update the brand
    const response = await axios.put(`${base_url}brand/update-brand/${brandId}`, formData, config);

    // Return the updated brand data if successful
    return response.data;
  } catch (error) {
    // Handle errors and return appropriate message
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};
  
// Get Single Brand
const getBrand = async (brandId) => {
  try {
    const response = await axios.get(base_url + `brand/get-brand/${brandId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Brands
const getAllBrands = async () => {
  try {
    const response = await axios.get(base_url + 'brand/all-brands');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Brand
const deleteBrand = async (brandId) => {
  try {
    const response = await axios.delete(base_url + `brand/delete-brand/${brandId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const brandService = {
  createBrand,
  updateBrand,
  getBrand,
  getAllBrands,
  deleteBrand,
};

export default brandService;
