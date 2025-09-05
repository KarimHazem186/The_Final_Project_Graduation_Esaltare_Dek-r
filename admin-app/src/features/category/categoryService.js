import axios from 'axios';
import { base_url } from '../../utils/base_url'; // Assuming base_url is defined in your utils
import { config } from '../../utils/axiosconfig'; // Assuming config is defined in your utils for headers

// Create Category
const createCategory = async (categoryData) => {
  const { categoryName, priority, description, status, images } = categoryData;
  const formData = new FormData();

  // Append all the form data (including images)
  formData.append('categoryName', categoryName);
  formData.append('priority', priority);
  formData.append('description', description);
  formData.append('status', status);
  images.forEach((image) => formData.append('images', image));

  try {
    const response = await axios.post(base_url + 'category/create-category', formData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update Category
const updateCategory = async (categoryId, categoryData) => {
  try {
    // Create FormData object to send the category data
    const formData = new FormData();

    // Append category data to FormData
    formData.append('categoryName', categoryData.categoryName);
    formData.append('priority', categoryData.priority);
    formData.append('description', categoryData.description);
    formData.append('status', categoryData.status);

    // Loop through images and append them to FormData
    categoryData.images.forEach((img) => {
      if (img instanceof File) {
        formData.append('images', img);
      }
    });

    // Handle old images (if any)
    const oldImages = categoryData.images.filter((img) => !(img instanceof File));
    formData.append('oldImages', JSON.stringify(oldImages));

    // Make the API request to update the category
    const response = await axios.put(
      `${base_url}category/update-category/${categoryId}`,
      formData,
      config
    );

    return response.data;
  } catch (error) {
    // Handle errors and return appropriate message
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Get Single Category
const getCategory = async (categoryId) => {
  try {
    const response = await axios.get(base_url + `category/get-category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Categories
const getAllCategories = async () => {
  try {
    const response = await axios.get(base_url + 'category/all-categories');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Category
const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(base_url + `category/delete-category/${categoryId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// // Toggle Category Status (Active/Inactive)
// const toggleCategoryStatus = async (categoryId) => {
//   try {
//     const response = await axios.put(
//       `${base_url}category/toggle-status/${categoryId}`,
//       {}, // No data required to toggle status
//       config
//     );
//     return response.data;
//   } catch (error) {
//     throw error.response ? error.response.data : error;
//   }
// };

const categoryService = {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategories,
  deleteCategory,
//   toggleCategoryStatus,
};

export default categoryService;
