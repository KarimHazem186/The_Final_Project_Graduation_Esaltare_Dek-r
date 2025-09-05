import axios from 'axios';
import { base_url } from '../../utils/base_url'; // Assuming base_url is defined in your utils
import { config } from '../../utils/axiosconfig'; // Assuming config is defined in your utils for headers

// Create Subcategory
const createSubcategory = async (subCategoryData) => {
    const { subcategoryName, categoryId, priority, description, status, images } = subCategoryData;
    const formData = new FormData();
  
    formData.append('subcategoryName', subcategoryName);
    formData.append('categoryId', categoryId);
    formData.append('priority', priority);
    formData.append('description', description);
    formData.append('status', status);
  
    images.forEach((image) => formData.append('images', image));
  
    try {
      const response = await axios.post(base_url + 'subcategory/create-subcategory', formData, config);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };
  
// Update Subcategory
const updateSubcategory = async (subcategoryId, subCategoryData) => {
    try {
      const formData = new FormData();
  
      formData.append('subcategoryName', subCategoryData.subcategoryName);
      formData.append('categoryId', subCategoryData.categoryId);
      formData.append('priority', subCategoryData.priority);
      formData.append('description', subCategoryData.description);
      formData.append('status', subCategoryData.status);
  
      subCategoryData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append('images', img);
        }
      });
      
    

      const oldImages = subCategoryData.images.filter((img) => !(img instanceof File));
      formData.append('oldImages', JSON.stringify(oldImages));
  
      const response = await axios.put(
        `${base_url}subcategory/update-subcategory/${subcategoryId}`,
        formData,
        config
      );
  
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
      throw new Error(errorMessage);
    }
  };
  
// Get Single Subcategory
const getSubcategory = async (subcategoryId) => {
  try {
    const response = await axios.get(base_url + `subcategory/get-subcategory/${subcategoryId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Subcategories
const getAllSubcategories = async () => {
  try {
    const response = await axios.get(base_url + 'subcategory/all-subcategories');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Subcategory
const deleteSubcategory = async (subcategoryId) => {
  try {
    const response = await axios.delete(base_url + `subcategory/delete-subcategory/${subcategoryId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


const subcategoryService = {
  createSubcategory,
  updateSubcategory,
  getSubcategory,
  getAllSubcategories,
  deleteSubcategory,
};

export default subcategoryService;
