import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import announcementService from './announcementService';

// Create Announcement
export const createAnnouncement = createAsyncThunk(
  'announcement/createAnnouncement',
  async (data, thunkAPI) => {
    try {
      return await announcementService.createAnnouncement(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Announcement
export const updateAnnouncement = createAsyncThunk(
  'announcement/updateAnnouncement',
  async ({ announcementId, data }, thunkAPI) => {
    try {
      return await announcementService.updateAnnouncement(announcementId, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get Single Announcement
export const getAnnouncement = createAsyncThunk(
  'announcement/getAnnouncement',
  async (id, thunkAPI) => {
    try {
      return await announcementService.getAnnouncement(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Get All Announcements
export const getAllAnnouncements = createAsyncThunk(
  'announcement/getAllAnnouncements',
  async (_, thunkAPI) => {
    try {
      return await announcementService.getAllAnnouncements();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Announcement
export const deleteAnnouncement = createAsyncThunk(
  'announcement/deleteAnnouncement',
  async (id, thunkAPI) => {
    try {
      return await announcementService.deleteAnnouncement(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const announcementSlice = createSlice({
  name: 'announcement',
  initialState: {
    announcements: [],
    announcement: null,
    createdAnnouncement: null,
    updatedAnnouncement: null,
    deletedAnnouncement: null,
    loading: false,
    error: null,
    successMessage: '',
  },
  reducers: {
    resetAnnouncementState: (state) => {
      state.announcement = null;
      state.createdAnnouncement = null;
      state.updatedAnnouncement = null;
      state.deletedAnnouncement = null;
      state.error = null;
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createAnnouncement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.createdAnnouncement = action.payload;
      state.successMessage = 'Announcement created successfully!';
    });
    builder.addCase(createAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update
    builder.addCase(updateAnnouncement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedAnnouncement = action.payload;
      const index = state.announcements.findIndex(
        (a) => a._id === action.payload._id
      );
      if (index !== -1) {
        state.announcements[index] = action.payload;
      }
      state.successMessage = 'Announcement updated successfully!';
    });
    builder.addCase(updateAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get Single
    builder.addCase(getAnnouncement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.announcement = action.payload;
    });
    builder.addCase(getAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Get All
    builder.addCase(getAllAnnouncements.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllAnnouncements.fulfilled, (state, action) => {
      state.loading = false;
      state.announcements = action.payload;
    });
    builder.addCase(getAllAnnouncements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete
    builder.addCase(deleteAnnouncement.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAnnouncement.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedAnnouncement = action.payload;
      state.announcements = state.announcements.filter(
        (a) => a._id !== action.payload._id
      );
      state.successMessage = 'Announcement deleted successfully!';
    });
    builder.addCase(deleteAnnouncement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { resetAnnouncementState } = announcementSlice.actions;
export default announcementSlice.reducer;
