import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import subcategoryService from './subcategoryService';

// Create Subcategory
export const createSubcategory = createAsyncThunk(
  'subcategory/createSubcategory',
  async (subCategoryData, thunkAPI) => {
    try {
      return await subcategoryService.createSubcategory(subCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Subcategory
export const updateSubcategory = createAsyncThunk(
  'subcategory/updateSubcategory',
  async ({ subcategoryId, subCategoryData }, thunkAPI) => {
    try {
      return await subcategoryService.updateSubcategory(subcategoryId, subCategoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Single Subcategory
export const getSubcategory = createAsyncThunk(
  'subcategory/getSubcategory',
  async (subcategoryId, thunkAPI) => {
    try {
      return await subcategoryService.getSubcategory(subcategoryId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Subcategories
export const getAllSubcategories = createAsyncThunk(
  'subcategory/getAllSubcategories',
  async (_, thunkAPI) => {
    try {
      return await subcategoryService.getAllSubcategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Subcategory
export const deleteSubcategory = createAsyncThunk(
  'subcategory/deleteSubcategory',
  async (subcategoryId, thunkAPI) => {
    try {
      return await subcategoryService.deleteSubcategory(subcategoryId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategories: [],
    subcategory: null,
    createdSubcategory: null,
    updatedSubcategory: null,
    deletedSubcategory: null,
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    resetSubcategoryState: (state) => {
      state.successMessage = '';
      state.error = null;
      state.createdSubcategory = null;
      state.updatedSubcategory = null;
      state.deletedSubcategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.createdSubcategory = action.payload;
        state.successMessage = 'Subcategory created successfully!';
      })
      .addCase(createSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedSubcategory = action.payload;
        const index = state.subcategories.findIndex((sc) => sc._id === action.payload._id);
        if (index !== -1) {
          state.subcategories[index] = action.payload;
        }
        state.successMessage = 'Subcategory updated successfully!';
      })
      .addCase(updateSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get One
      .addCase(getSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategory = action.payload;
      })
      .addCase(getSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(getAllSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteSubcategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.deletedSubcategory = action.payload;
        state.subcategories = state.subcategories.filter(
          (sc) => sc._id !== action.payload._id
        );
        state.successMessage = 'Subcategory deleted successfully!';
      })
      .addCase(deleteSubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSubcategoryState } = subcategorySlice.actions;
export default subcategorySlice.reducer;
