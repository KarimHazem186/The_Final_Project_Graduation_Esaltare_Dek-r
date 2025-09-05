import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

// Create Announcement
const createAnnouncement = async (data) => {
  const { announcementTitle, percentage, priority, status, images } = data;
  const formData = new FormData();

  formData.append('announcementTitle', announcementTitle);
  formData.append('percentage', percentage);
  formData.append('priority', priority);
  formData.append('status', status);

  images.forEach(image => formData.append('images', image));

  try {
    const response = await axios.post(base_url + 'announcement/create-announcement', formData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update Announcement
const updateAnnouncement = async (announcementId, data) => {
  const formData = new FormData();

  formData.append('announcementTitle', data.announcementTitle);
  formData.append('percentage', data.percentage);
  formData.append('priority', data.priority);
  formData.append('status', data.status);

  data.images.forEach(img => {
    if (img instanceof File) {
      formData.append('images', img);
    }
  });

  const oldImages = data.images.filter(img => !(img instanceof File));
  formData.append('oldImages', JSON.stringify(oldImages));

  try {
    const response = await axios.put(`${base_url}announcement/update-announcement/${announcementId}`, formData, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Get Single Announcement
const getAnnouncement = async (announcementId) => {
  try {
    const response = await axios.get(`${base_url}announcement/get-announcement/${announcementId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Announcements
const getAllAnnouncements = async () => {
  try {
    const response = await axios.get(`${base_url}announcement/all-announcements`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Announcement
const deleteAnnouncement = async (announcementId) => {
  try {
    const response = await axios.delete(`${base_url}announcement/delete-announcement/${announcementId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const announcementService = {
  createAnnouncement,
  updateAnnouncement,
  getAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement,
};

export default announcementService;
