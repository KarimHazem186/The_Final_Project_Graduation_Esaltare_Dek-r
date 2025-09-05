import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import brandService from './brandService';

// Create async actions for each operation
// Create Brand
export const createBrand = createAsyncThunk(
  'brand/createBrand',
  async (brandData, thunkAPI) => {
    try {
      const response = await brandService.createBrand(brandData);
      return response;  // Return the created brand data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Update Brand
export const updateBrand = createAsyncThunk(
  'brand/updateBrand',
  async ({ brandId, brandData }, thunkAPI) => {
    try {
      const response = await brandService.updateBrand(brandId, brandData);
      return response;  // Return the updated brand data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);


// Get Single Brand
export const getBrand = createAsyncThunk(
  'brand/getBrand',
  async (brandId, thunkAPI) => {
    try {
      const response = await brandService.getBrand(brandId);
      return response;  // Return the fetched brand data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Get All Brands
export const getAllBrands = createAsyncThunk(
  'brand/getAllBrands',
  async (_, thunkAPI) => {
    try {
      const response = await brandService.getAllBrands();
      return response;  // Return the list of all brands
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Delete Brand
export const deleteBrand = createAsyncThunk(
  'brand/deleteBrand',
  async (brandId, thunkAPI) => {
    try {
      const response = await brandService.deleteBrand(brandId);
      return response;  // Return the deleted brand's information
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Create the slice
const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    brands: [],              // Store all brands
    createdBrand: null,      // Store the created brand
    updatedBrand: null,      // Store the updated brand
    deletedBrand: null,      // Store the deleted brand's info
    brand: null,             // Store a single brand's data
    loading: false,          // Loading state for async requests
    error: null,             // Store error if any async operation fails
    successMessage: '',      // Success message after creating/updating/deleting
  },
  reducers: {
    resetBrandState: (state) => {
      state.successMessage = '';  // Reset success message on some actions
      state.error = null;          // Reset error message
      state.createdBrand = null;   // Reset created brand
      state.updatedBrand = null;   // Reset updated brand
      state.deletedBrand = null;   // Reset deleted brand
    },
  },
  extraReducers: (builder) => {
    // Handle createBrand
    builder.addCase(createBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.createdBrand = action.payload;  // Store the created brand
      state.successMessage = 'Brand created successfully!';
    });
    builder.addCase(createBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updateBrand
    builder.addCase(updateBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedBrand = action.payload;  // Store the updated brand
      // Update the brands array with the updated brand
      const index = state.brands.findIndex((brand) => brand._id === action.payload._id);
      if (index !== -1) {
        state.brands[index] = action.payload;
      }
      state.successMessage = 'Brand updated successfully!';
    });
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getBrand
    builder.addCase(getBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.brand = action.payload;  // Set the fetched brand data
    });
    builder.addCase(getBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getAllBrands
    builder.addCase(getAllBrands.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllBrands.fulfilled, (state, action) => {
      state.loading = false;
      state.brands = action.payload;  // Set the list of all brands
    });
    builder.addCase(getAllBrands.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle deleteBrand
    builder.addCase(deleteBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedBrand = action.payload;  // Store the deleted brand's info
      state.brands = state.brands.filter((brand) => brand._id !== action.payload._id);  // Remove the deleted brand
      state.successMessage = 'Brand deleted successfully!';
    });
    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions
export const { resetBrandState } = brandSlice.actions;

// Export reducer
export default brandSlice.reducer;

