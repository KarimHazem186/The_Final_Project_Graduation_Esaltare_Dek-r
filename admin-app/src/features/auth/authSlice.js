import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import axios from "axios";

// Helpers
const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const getAccessTokenFromLocalStorage = localStorage.getItem("accessToken") || null;

const initialState = {
  user: getUserFromLocalStorage,
  accessToken: getAccessTokenFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  newPassword: '',
  password: '',  // Ensure this field is initialized properly
  selectedUser : null,
  users: [],
  address: null,

};

// ====================== THUNKS ======================

// Register
export const userRegister = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    return await authService.userRegister(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// User Login
export const userLogin = createAsyncThunk("auth/user-login", async (userData, thunkAPI) => {
  try {
    return await authService.userLogin(userData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Admin Login
export const adminLogin = createAsyncThunk("auth/admin-login", async (adminData, thunkAPI) => {
  try {
    return await authService.adminLogin(adminData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});


// Thunk: Get All Users
export const getAllUsers = createAsyncThunk("auth/fetchAll", async (_, thunkAPI) => {
  try {
    return await authService.getAllUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Thunk: Get User by ID
export const getUserById = createAsyncThunk("auth/fetchById", async (id, thunkAPI) => {
  try {
    return await authService.getUserById(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});


// Save Address
export const saveAddress = createAsyncThunk(
  "auth/save-address",
  async (address, thunkAPI) => {
    try {
      return await authService.saveAddress(address);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const updateUser = createAsyncThunk(
  "auth/update-user",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.updatedUser(userData);
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);


export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
      try {
        return await authService.refreshToken();
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
);
  


// Forgot Password
export const forgotPassword = createAsyncThunk('auth/forgot-password', async (emailData, thunkAPI) => {
    try {
      return await authService.forgotPassword(emailData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Reset link failed');
    }
});

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ token, password }, { rejectWithValue }) => {
      try {
        const response = await authService.resetPassword(token, password); // Ensure token and password are passed here
        return response; // Return successful response
      } catch (error) {
        return rejectWithValue(error.response.data.message);  // Handle error properly
      }
    }
  );
    


// Logout
export const userLogout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});


export const deleteUser = createAsyncThunk(
  "auth/delete-user",
  async (id, thunkAPI) => {
    try {
      const data = await authService.deleteUser(id);
      return data; // Successfully deleted user
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);


export const resetState = createAction("Reset_all");


// ====================== SLICE ======================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "User registered successfully.";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      // User Login
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.accessToken = action.payload?.token || null;
        state.message = "User logged in successfully.";
        localStorage.setItem('user', JSON.stringify(action.payload));       // <-- Add this
        // localStorage.setItem('accessToken', action.payload?.token || "");   // <-- Optional      
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Admin Login
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.accessToken = action.payload?.token || null;
        state.message = "Admin logged in successfully.";
        localStorage.setItem('user', JSON.stringify(action.payload));       // <-- Add this
        // localStorage.setItem('accessToken', action.payload?.token || "");   // <-- Optional      
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      // fetchAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // fetchUserById
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedUser = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Save Address
      .addCase(saveAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.address = action.payload.address || action.payload;
        state.message = "Address saved successfully.";
      })
      .addCase(saveAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })


      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      

      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accessToken = action.payload; // Update the access token
        localStorage.setItem('accessToken', action.payload); // Store the new token in localStorage
        state.message = 'Token refreshed successfully!';
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Store the error message
      })



    // Forgot Password
    .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Password reset link sent';
        })
        .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        })

        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.message = 'Password reset successful';
            state.newPassword = action.payload; // Store the new password or a success message
            state.password = action.payload; // Store the new password or a success message
          })
          .addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload?.message || 'Password reset failed';
          })
    


      // Logout
      .addCase(userLogout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isSuccess = true;
        state.message = "User logged out.";
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");      
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })


      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally handle the state change after deletion (like clearing user data)
        state.user = null;
        localStorage.removeItem("user"); // Remove user from localStorage
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(resetState, () => initialState)
  },
});

// Export Actions
export const { resetAuthState } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;
