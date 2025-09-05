import axios from 'axios';
import { base_url } from '../../utils/base_url';

// استخراج التوكن من localStorage
const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage ? getTokenFromLocalStorage.token : ''}`,
    Accept: "application/json",
    'Content-Type': 'application/json', 
    'Cache-Control': 'no-cache',
  },
  withCredentials: true, 
};

// Create Coupon
const createCoupon = async (couponData) => {
  try {
    const response = await axios.post(base_url + 'coupon/create-coupon', couponData, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update Coupon
const updateCoupon = async (couponId, couponData) => {
  try {
    const response = await axios.put(`${base_url}coupon/update-coupon/${couponId}`, couponData, config);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred';
    throw new Error(errorMessage);
  }
};

// Get Single Coupon
const getCoupon = async (couponId) => {
  try {
    const response = await axios.get(base_url + `coupon/get-coupon/${couponId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get All Coupons
const getAllCoupons = async () => {
  try {
    const response = await axios.get(base_url + 'coupon/all-coupons', config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete Coupon
const deleteCoupon = async (couponId) => {
  try {
    const response = await axios.delete(base_url + `coupon/delete-coupon/${couponId}`, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const couponService = {
  createCoupon,
  updateCoupon,
  getCoupon,
  getAllCoupons,
  deleteCoupon,
};

export default couponService;
