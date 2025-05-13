// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { API_BASE_URL } from "./api";

// // Async thunk to fetch all PC components
// export const fetchPCComponents = createAsyncThunk(
//   "pcBuilder/fetchPCComponents",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token || localStorage.getItem("authToken");

//       if (!token) {
//         return rejectWithValue("No authentication token found.");
//       }

//       const response = await axios.get(`${API_BASE_URL}/api/PcBuilder/Allget`, {//get all pc category 
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
        
//       });

//       return response.data;
//     }
//      catch (error) {
//       console.error("Fetch PC components error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch PC components");
//     }
//   }
// );

// // Async thunk to fetch a PC component by ID
// export const fetchPCComponentById = createAsyncThunk(
//   "pcBuilder/fetchPCComponentById",
//   async (id, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token || localStorage.getItem("authToken");

//       if (!token) {
//         return rejectWithValue("No authentication token found.");
//       }

//       const response = await axios.get(`${API_BASE_URL}/api/PcBuilder/get/${id}`, {//get all pc category by id
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Fetch PC component by ID error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch PC component");
//     }
//   }
// );

// // Async thunk to fetch all PC parts
// export const fetchPCParts = createAsyncThunk(
//   "pcBuilder/fetchPCParts",
//   async (_, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token || localStorage.getItem("authToken");

//       if (!token) {
//         return rejectWithValue("No authentication token found.");
//       }

//       const response = await axios.get(`${API_BASE_URL}/api/PcForPartAdd/get`, { // get all pc parts item 
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Fetch PC parts error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch PC parts");
//     }
//   }
// );

// // Async thunk to add a PC component
// export const addPCComponent = createAsyncThunk(
//   "pcBuilder/addPCComponent",
//   async ({ name, image }, { rejectWithValue, getState }) => {
//     try {
//       const state = getState();
//       const token = state.auth.token || localStorage.getItem("authToken");

//       if (!token) {
//         return rejectWithValue("No authentication token found.");
//       }

//       const formData = new FormData();
//       formData.append("pcbuilder", new Blob([JSON.stringify({ name })], { type: "application/json" }));
//       formData.append("image", image);

//       const response = await axios.post(
//         `${API_BASE_URL}/api/PcBuilder/save`, //post to server pc category with image
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Add PC component error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to add PC component");
//     }
//   }
// );

// // Async thunk to add a PC part
// export const addPCPart = createAsyncThunk(
//   "pcBuilder/addPCPart",
//   async (
//     { name, description, performance, ability, regularprice, specialprice, quantity, pcbuilder, image },
//     { rejectWithValue, getState }
//   ) => {
//     try {
//       const state = getState();
//       const token = state.auth.token || localStorage.getItem("authToken");

//       if (!token) {
//         return rejectWithValue("No authentication token found.");
//       }

//       const formData = new FormData();
//       const partData = {
//         name,
//         description,
//         performance,
//         ability,
//         regularprice: parseFloat(regularprice),
//         specialprice: parseFloat(specialprice),
//         quantity: parseInt(quantity),
//         pcbuilder: { id: parseInt(pcbuilder.id) },
//       };

//       formData.append(
//         "pcforpartadd",
//         new Blob([JSON.stringify(partData)], { type: "application/json" })
//       );
//       formData.append("image", image);

//       const response = await axios.post(
//         `${API_BASE_URL}/api/PcForPartAdd/save`, //post to server pc parts item with image
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error("Add PC part error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to add PC part");
//     }
//   }
// );

// const pcbuilderSlice = createSlice({
//   name: "pcBuilder",
//   initialState: {
//     components: [],
//     parts: [],
//     loading: { component: false, part: false },
//     error: { component: null, part: null },
//     successMessage: { component: null, part: null },
//   },
//   reducers: {
//     clearPCBError: (state) => {
//       state.error.component = null;
//       state.error.part = null;
//     },
//     clearPCBSuccess: (state) => {
//       state.successMessage.component = null;
//       state.successMessage.part = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch PC Components
//       .addCase(fetchPCComponents.pending, (state) => {
//         state.loading.component = true;
//         state.error.component = null;
//       })
//       .addCase(fetchPCComponents.fulfilled, (state, action) => {
//         state.loading.component = false;
//         state.components = action.payload;
//       })
//       .addCase(fetchPCComponents.rejected, (state, action) => {
//         state.loading.component = false;
//         state.error.component = action.payload;
//       })
//       // Fetch PC Component by ID
//       .addCase(fetchPCComponentById.pending, (state) => {
//         state.loading.component = true;
//         state.error.component = null;
//       })
//       .addCase(fetchPCComponentById.fulfilled, (state, action) => {
//         state.loading.component = false;
//         const index = state.components.findIndex((c) => c.id === action.payload.id);
//         if (index >= 0) {
//           state.components[index] = action.payload;
//         } else {
//           state.components.push(action.payload);
//         }
//       })
//       .addCase(fetchPCComponentById.rejected, (state, action) => {
//         state.loading.component = false;
//         state.error.component = action.payload;
//       })
//       // Fetch PC Parts
//       .addCase(fetchPCParts.pending, (state) => {
//         state.loading.part = true;
//         state.error.part = null;
//       })
//       .addCase(fetchPCParts.fulfilled, (state, action) => {
//         state.loading.part = false;
//         state.parts = action.payload;
//       })
//       .addCase(fetchPCParts.rejected, (state, action) => {
//         state.loading.part = false;
//         state.error.part = action.payload;
//       })
//       // Add PC Component
//       .addCase(addPCComponent.pending, (state) => {
//         state.loading.component = true;
//         state.error.component = null;
//         state.successMessage.component = null;
//       })
//       .addCase(addPCComponent.fulfilled, (state, action) => {
//         state.loading.component = false;
//         state.components.push(action.payload);
//         state.successMessage.component = "PC component added successfully!";
//       })
//       .addCase(addPCComponent.rejected, (state, action) => {
//         state.loading.component = false;
//         state.error.component = action.payload;
//       })
//       // Add PC Part
//       .addCase(addPCPart.pending, (state) => {
//         state.loading.part = true;
//         state.error.part = null;
//         state.successMessage.part = null;
//       })
//       .addCase(addPCPart.fulfilled, (state, action) => {
//         state.loading.part = false;
//         state.parts.push(action.payload);
//         state.successMessage.part = "PC part added successfully!";
//       })
//       .addCase(addPCPart.rejected, (state, action) => {
//         state.loading.part = false;
//         state.error.part = action.payload;
//       });
//   },
// });

// export const { clearPCBError, clearPCBSuccess } = pcbuilderSlice.actions;
// export default pcbuilderSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "./api";

// Async thunk to fetch all PC components
export const fetchPCComponents = createAsyncThunk(
  "pcBuilder/fetchPCComponents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/PcBuilder/Allget`, {
     
      });
      // Validate response data
      const components = response.data;
      if (!Array.isArray(components)) {
        return rejectWithValue("Invalid response: Components data is not an array.");
      }

      // Ensure imagea field exists
      components.forEach((component) => {
        if (!component.imagea) {
          console.warn(`Component ${component.name} is missing imagea field.`);
          component.imagea = null;
        }
      });

      return components;
    } catch (error) {
      console.error("Fetch PC components error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch PC components");
    }
  }
);

// Async thunk to fetch a PC component by ID
export const fetchPCComponentById = createAsyncThunk(
  "pcBuilder/fetchPCComponentById",
  async (id, { rejectWithValue }) => {
    try {
   
      const response = await axios.get(`${API_BASE_URL}/api/PcBuilder/get/${id}`, {
  
      });

      return response.data;
    } catch (error) {
      console.error("Fetch PC component by ID error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch PC component");
    }
  }
);

// Async thunk to fetch all PC parts
export const fetchPCParts = createAsyncThunk(
  "pcBuilder/fetchPCParts",
  async (_, { rejectWithValue}) => {
    try {

      const response = await axios.get(`${API_BASE_URL}/api/PcForPartAdd/get`, {
   
      });

      // Validate response data
      const parts = response.data;
      if (!Array.isArray(parts)) {
        return rejectWithValue("Invalid response: Parts data is not an array.");
      }

      // Ensure image field exists
      parts.forEach((part) => {
        if (!part.image) {
          console.warn(`Part ${part.name} is missing image field.`);
          part.image = null;
        }
      });

      return parts;
    } catch (error) {
      console.error("Fetch PC parts error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch PC parts");
    }
  }
);

// Async thunk to fetch PC parts by category ID
export const fetchPCPartsByCategory = createAsyncThunk(
  "pcBuilder/fetchPCPartsByCategory",
  async (id, { rejectWithValue }) => {
    try {

      const response = await axios.get(`${API_BASE_URL}api/PcForPartAdd/get/${id}`, {
     
      });

      // Validate response data
      const parts = response.data;
      if (!Array.isArray(parts)) {
        return rejectWithValue("Invalid response: Parts data is not an array.");
      }

      // Ensure image field exists
      parts.forEach((part) => {
        if (!part.image) {
          console.warn(`Part ${part.name} is missing image field.`);
          part.image = null;
        }
      });

      return parts;
    } catch (error) {
      console.error("Fetch PC parts by category error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch PC parts for category");
    }
  }
);

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
      formData.append("pcbuilder", new Blob([JSON.stringify({ name })], { type: "application/json" }));
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

      return response.data;
    } catch (error) {
      console.error("Add PC component error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to add PC component");
    }
  }
);

// Async thunk to add a PC part
export const addPCPart = createAsyncThunk(
  "pcBuilder/addPCPart",
  async (
    { name, description, performance, ability, regularprice, specialprice, quantity, pcbuilder, image },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState();
      const token = state.auth.token || localStorage.getItem("authToken");

      if (!token) {
        return rejectWithValue("No authentication token found.");
      }

      const formData = new FormData();
      const partData = {
        name,
        description,
        performance,
        ability,
        regularprice: parseFloat(regularprice),
        specialprice: parseFloat(specialprice),
        quantity: parseInt(quantity),
        pcbuilder: { id: parseInt(pcbuilder.id) },
      };

      formData.append(
        "pcforpartadd",
        new Blob([JSON.stringify(partData)], { type: "application/json" })
      );
      formData.append("image", image);

      const response = await axios.post(
        `${API_BASE_URL}/api/PcForPartAdd/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Add PC part error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to add PC part");
    }
  }
);

const pcbuilderSlice = createSlice({
  name: "pcBuilder",
  initialState: {
    components: [],
    parts: [],
    categoryParts: [], // Store parts for the selected category
    loading: { component: false, part: false, categoryParts: false },
    error: { component: null, part: null, categoryParts: null },
    successMessage: { component: null, part: null },
  },
  reducers: {
    clearPCBError: (state) => {
      state.error.component = null;
      state.error.part = null;
      state.error.categoryParts = null;
    },
    clearPCBSuccess: (state) => {
      state.successMessage.component = null;
      state.successMessage.part = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch PC Components
      .addCase(fetchPCComponents.pending, (state) => {
        state.loading.component = true;
        state.error.component = null;
      })
      .addCase(fetchPCComponents.fulfilled, (state, action) => {
        state.loading.component = false;
        state.components = action.payload;
      })
      .addCase(fetchPCComponents.rejected, (state, action) => {
        state.loading.component = false;
        state.error.component = action.payload;
      })
      // Fetch PC Component by ID
      .addCase(fetchPCComponentById.pending, (state) => {
        state.loading.component = true;
        state.error.component = null;
      })
      .addCase(fetchPCComponentById.fulfilled, (state, action) => {
        state.loading.component = false;
        const index = state.components.findIndex((c) => c.id === action.payload.id);
        if (index >= 0) {
          state.components[index] = action.payload;
        } else {
          state.components.push(action.payload);
        }
      })
      .addCase(fetchPCComponentById.rejected, (state, action) => {
        state.loading.component = false;
        state.error.component = action.payload;
      })
      // Fetch PC Parts
      .addCase(fetchPCParts.pending, (state) => {
        state.loading.part = true;
        state.error.part = null;
      })
      .addCase(fetchPCParts.fulfilled, (state, action) => {
        state.loading.part = false;
        state.parts = action.payload;
      })
      .addCase(fetchPCParts.rejected, (state, action) => {
        state.loading.part = false;
        state.error.part = action.payload;
      })
      // Fetch PC Parts by Category
      .addCase(fetchPCPartsByCategory.pending, (state) => {
        state.loading.categoryParts = true;
        state.error.categoryParts = null;
      })
      .addCase(fetchPCPartsByCategory.fulfilled, (state, action) => {
        state.loading.categoryParts = false;
        state.categoryParts = action.payload;
      })
      .addCase(fetchPCPartsByCategory.rejected, (state, action) => {
        state.loading.categoryParts = false;
        state.error.categoryParts = action.payload;
      })
      // Add PC Component
      .addCase(addPCComponent.pending, (state) => {
        state.loading.component = true;
        state.error.component = null;
        state.successMessage.component = null;
      })
      .addCase(addPCComponent.fulfilled, (state, action) => {
        state.loading.component = false;
        state.components.push(action.payload);
        state.successMessage.component = "PC component added successfully!";
      })
      .addCase(addPCComponent.rejected, (state, action) => {
        state.loading.component = false;
        state.error.component = action.payload;
      })
      // Add PC Part
      .addCase(addPCPart.pending, (state) => {
        state.loading.part = true;
        state.error.part = null;
        state.successMessage.part = null;
      })
      .addCase(addPCPart.fulfilled, (state, action) => {
        state.loading.part = false;
        state.parts.push(action.payload);
        state.successMessage.part = "PC part added successfully!";
      })
      .addCase(addPCPart.rejected, (state, action) => {
        state.loading.part = false;
        state.error.part = action.payload;
      });
  },
});

export const { clearPCBError, clearPCBSuccess } = pcbuilderSlice.actions;
export default pcbuilderSlice.reducer;
