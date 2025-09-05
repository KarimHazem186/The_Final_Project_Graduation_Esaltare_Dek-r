import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import couponService from './couponService';

// Create Coupon
export const createCoupon = createAsyncThunk(
  'coupon/createCoupon',
  async (couponData, thunkAPI) => {
    try {
      const response = await couponService.createCoupon(couponData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Coupon
export const updateCoupon = createAsyncThunk(
  'coupon/updateCoupon',
  async ({ couponId, couponData }, thunkAPI) => {
    try {
      const response = await couponService.updateCoupon(couponId, couponData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Single Coupon
export const getCoupon = createAsyncThunk(
  'coupon/getCoupon',
  async (couponId, thunkAPI) => {
    try {
      const response = await couponService.getCoupon(couponId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Coupons
export const getAllCoupons = createAsyncThunk(
  'coupon/getAllCoupons',
  async (_, thunkAPI) => {
    try {
      const response = await couponService.getAllCoupons();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Coupon
export const deleteCoupon = createAsyncThunk(
  'coupon/deleteCoupon',
  async (couponId, thunkAPI) => {
    try {
      const response = await couponService.deleteCoupon(couponId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create the slice
const couponSlice = createSlice({
  name: 'coupon',
  initialState: {
    coupons: [],
    createdCoupon: null,
    updatedCoupon: null,
    deletedCoupon: null,
    coupon: null,
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    resetCouponState: (state) => {
      state.successMessage = '';
      state.error = null;
      state.createdCoupon = null;
      state.updatedCoupon = null;
      state.deletedCoupon = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.createdCoupon = action.payload;
        state.successMessage = 'Coupon created successfully!';
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedCoupon = action.payload;
        const index = state.coupons.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.coupons[index] = action.payload;
        state.successMessage = 'Coupon updated successfully!';
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One
      .addCase(getCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupon = action.payload;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedCoupon = action.payload;
        state.coupons = state.coupons.filter(c => c._id !== action.payload._id);
        state.successMessage = 'Coupon deleted successfully!';
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { resetCouponState } = couponSlice.actions;

// Export reducer
export default couponSlice.reducer;
