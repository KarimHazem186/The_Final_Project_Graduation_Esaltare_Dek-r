import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService'; // Adjust path according to your project structure

// Create async actions for each operation
// Create Post
export const createPost = createAsyncThunk(
  'post/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await postService.createPost(postData);
      return response;  // Return the created post data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Update Post
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ postId, postData }, thunkAPI) => {
    try {
      const response = await postService.updatePost(postId, postData);
      return response;  // Return the updated post data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Get Single Post
export const getPost = createAsyncThunk(
  'post/getPost',
  async (postId, thunkAPI) => {
    try {
      const response = await postService.getPost(postId);
      return response;  // Return the fetched post data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Get All Posts
export const getAllPosts = createAsyncThunk(
  'post/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await postService.getAllPosts();
      return response;  // Return the list of all posts
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId, thunkAPI) => {
    try {
      const response = await postService.deletePost(postId);
      return response;  // Return the deleted post's information
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Reject with error message if it occurs
    }
  }
);

// Create the slice
const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],              // Store all posts
    createdPost: null,      // Store the created post
    updatedPost: null,      // Store the updated post
    deletedPost: null,      // Store the deleted post's info
    post: null,             // Store a single post's data
    loading: false,          // Loading state for async requests
    error: null,             // Store error if any async operation fails
    successMessage: '',      // Success message after creating/updating/deleting
  },
  reducers: {
    resetPostState: (state) => {
      state.successMessage = '';  // Reset success message on some actions
      state.error = null;          // Reset error message
      state.createdPost = null;   // Reset created post
      state.updatedPost = null;   // Reset updated post
      state.deletedPost = null;   // Reset deleted post
    },
  },
  extraReducers: (builder) => {
    // Handle createPost
    builder.addCase(createPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.loading = false;
      state.createdPost = action.payload;  // Store the created post
      state.successMessage = 'Post created successfully!';
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle updatePost
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedPost = action.payload;  // Store the updated post
      // Update the posts array with the updated post
      const index = state.posts.findIndex((post) => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.successMessage = 'Post updated successfully!';
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getPost
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;  // Set the fetched post data
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle getAllPosts
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;  // Set the list of all posts
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Handle deletePost
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedPost = action.payload;  // Store the deleted post's info
      state.posts = state.posts.filter((post) => post._id !== action.payload._id);  // Remove the deleted post
      state.successMessage = 'Post deleted successfully!';
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Export actions
export const { resetPostState } = postSlice.actions;

// Export reducer
export default postSlice.reducer;
