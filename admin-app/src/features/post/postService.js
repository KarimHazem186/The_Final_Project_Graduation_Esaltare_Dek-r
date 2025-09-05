import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// Create Post
const createPost = async (postData) => {
  const { postTitle, priority, description, status, images } = postData;
  const formData = new FormData();

  // Append all the form data (including images)
  formData.append('postTitle', postTitle);
  formData.append('priority', priority);
  formData.append('description', description);
  formData.append('status', status);
  images.forEach(image => formData.append('images', image));

  try {
    const response = await axios.post(base_url + 'post/create-post', formData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Function to update post data
const updatePost = async (postId, postData) => {
  try {
    // Create FormData object to send the post data
    const formData = new FormData();

    // Append post data to FormData
    formData.append('postTitle', postData.postTitle);
    formData.append('priority', postData.priority);
    formData.append('description', postData.description);
    formData.append('status', postData.status);

    // Loop through images and append them to FormData
    postData.images.forEach((img) => {
        if (img instanceof File) {
          formData.append('images', img);
        }
    });

    const oldImages = postData.images.filter(img => !(img instanceof File));
    formData.append('oldImages', JSON.stringify(oldImages));

    // Make the API request to update the post
    const response = await axios.put(`${base_url}post/update-post/${postId}`, formData, config);

    // Return the updated post data if successful
    return response.data;
  } catch (error) {
    // Handle errors and return appropriate message
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Get Single Post
const getPost = async (postId) => {
  try {
    const response = await axios.get(base_url + `post/get-post/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Posts
const getAllPosts = async () => {
  try {
    const response = await axios.get(base_url + 'post/all-posts');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Post
const deletePost = async (postId) => {
  try {
    const response = await axios.delete(base_url + `post/delete-post/${postId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const postService = {
  createPost,
  updatePost,
  getPost,
  getAllPosts,
  deletePost,
};

export default postService;
