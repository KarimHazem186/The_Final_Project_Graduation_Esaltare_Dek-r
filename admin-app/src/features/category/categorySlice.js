import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from './categoryService'; // Import categoryService

// Create async actions for each operation
// Create Category
export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData, thunkAPI) => {
    try {
      const response = await categoryService.createCategory(categoryData);
      return response;  // Return the created category data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, categoryData }, thunkAPI) => {
    try {
      const response = await categoryService.updateCategory(categoryId, categoryData);
      return response;  // Return the updated category data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Get Single Category
export const getCategory = createAsyncThunk(
  'category/getCategory',
  async (categoryId, thunkAPI) => {
    try {
      const response = await categoryService.getCategory(categoryId);
      return response;  // Return the fetched category data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Get All Categories
export const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await categoryService.getAllCategories();
      return response;  // Return the list of all categories
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, thunkAPI) => {
    try {
      const response = await categoryService.deleteCategory(categoryId);
      return response;  // Return the deleted category's information
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// // Toggle Category Status (Active/Inactive)
// export const toggleCategoryStatus = createAsyncThunk(
//   'category/toggleCategoryStatus',
//   async (categoryId, thunkAPI) => {
//     try {
//       const response = await categoryService.toggleCategoryStatus(categoryId);
//       return response;  // Return the updated category status
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
//     }
//   }
// );

// Create the slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],          // Store all categories
    createdCategory: null,   // Store the created category
    updatedCategory: null,   // Store the updated category
    deletedCategory: null,   // Store the deleted category's info
    category: null,          // Store a single category's data
    loading: false,          // Loading state for async requests
    error: null,             // Store error if any async operation fails
    successMessage: '',      // Success message after creating/updating/deleting
  },
  reducers: {
    resetCategoryState: (state) => {
      state.successMessage = '';  // Reset success message on some actions
      state.error = null;          // Reset error message
      state.createdCategory = null;  // Reset created category
      state.updatedCategory = null;  // Reset updated category
      state.deletedCategory = null;  // Reset deleted category
    },
  },
  extraReducers: (builder) => {
    // Handle createCategory
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.createdCategory = action.payload;  // Store the created category
      state.successMessage = 'Category created successfully!';
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updateCategory
    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedCategory = action.payload;  // Store the updated category
      // Update the categories array with the updated category
      const index = state.categories.findIndex((category) => category._id === action.payload._id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.successMessage = 'Category updated successfully!';
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getCategory
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;  // Set the fetched category data
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getAllCategories
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;  // Set the list of all categories
    });
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle deleteCategory
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedCategory = action.payload;  // Store the deleted category's info
      state.categories = state.categories.filter((category) => category._id !== action.payload._id);  // Remove the deleted category
      state.successMessage = 'Category deleted successfully!';
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // // Handle toggleCategoryStatus
    // builder.addCase(toggleCategoryStatus.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(toggleCategoryStatus.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const updatedCategory = action.payload;
    //   const index = state.categories.findIndex((category) => category._id === updatedCategory._id);
    //   if (index !== -1) {
    //     state.categories[index] = updatedCategory;
    //   }
    //   state.successMessage = 'Category status updated successfully!';
    // });
    // builder.addCase(toggleCategoryStatus.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

// Export actions
export const { resetCategoryState } = categorySlice.actions;

// Export reducer
export default categorySlice.reducer;
