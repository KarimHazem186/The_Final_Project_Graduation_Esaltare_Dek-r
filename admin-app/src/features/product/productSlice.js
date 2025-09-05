import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

// Create Product
export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, thunkAPI) => {
    try {
      const response = await productService.createProduct(productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async ({ productId, productData }, thunkAPI) => {
    try {
      const response = await productService.updateProduct(productId, productData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Single Product
export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await productService.getProduct(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Products
export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await productService.getAllProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, thunkAPI) => {
    try {
      const response = await productService.deleteProduct(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    product: null,
    createdProduct: null,
    updatedProduct: null,
    deletedProduct: null,
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    resetProductState: (state) => {
      state.successMessage = '';
      state.error = null;
      state.createdProduct = null;
      state.updatedProduct = null;
      state.deletedProduct = null;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.createdProduct = action.payload;
      state.successMessage = 'Product created successfully!';
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedProduct = action.payload;
      const index = state.products.findIndex(p => p._id === action.payload._id);
      if (index !== -1) state.products[index] = action.payload;
      state.successMessage = 'Product updated successfully!';
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get One
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedProduct = action.payload;
      state.products = state.products.filter(p => p._id !== action.payload._id);
      state.successMessage = 'Product deleted successfully!';
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions and reducer
export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
