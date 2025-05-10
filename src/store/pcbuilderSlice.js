import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./api";

// Async thunk to add a PC component
export const addPCComponent = createAsyncThunk(
  "pcBuilder/addPCComponent",
  async ({ name, image }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found.");
      }
      const formData = new FormData();
      // Build dynamic product JSON
      const pcbuilder = {
        name: name,
        image: image
      };
  
      formData.append(
        "pcbuilder",
        new Blob([JSON.stringify(pcbuilder)], { type: "application/json" })
      );
  
      formData.append("image", image);
      const response = await axios.post(
        `${API_BASE_URL}/api/PcBuilder/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Added PC component:", response.data);

      return response.data;
    } catch (error) {
      console.error("Add PC component error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to add PC component");
    }
  }
);
const pcBuilderSlice = createSlice({
  name: "pcBuilder",
  initialState: {
    components: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearPCBError: (state) => {
      state.error = null;
    },
    clearPCBSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add PC Component
      .addCase(addPCComponent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addPCComponent.fulfilled, (state, action) => {
        state.loading = false;
        state.components.push(action.payload);
        state.successMessage = "PC component added successfully!";
      })
      .addCase(addPCComponent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const { clearPCBError, clearPCBSuccess } = pcBuilderSlice.actions;
export default pcBuilderSlice.reducer;
