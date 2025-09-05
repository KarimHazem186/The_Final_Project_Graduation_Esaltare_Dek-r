// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Adjust path if needed
import brandReducer from '../features/brand/brandSlice';
import postReducer from '../features/post/postSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productSlice';
import subcategoryReducer from '../features/subcategory/subcategorySlice';
import couponReducer from '../features/coupon/couponSlice';
import announcementReducer from '../features/announcement/announcementSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    product:productReducer,
    brand: brandReducer,
    post:postReducer,
    announcement:announcementReducer,
    coupon:couponReducer,
  },
  devTools: true, 
});
