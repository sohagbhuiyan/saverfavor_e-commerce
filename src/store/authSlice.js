import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://108.181.173.121:6061/api/userRegistration/",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://108.181.173.121:6061/login",
        credentials
      );
      
      // Store email in localStorage along with token
      localStorage.setItem("userEmail", credentials.email);
      return {
        token: response.data.token,
        email: credentials.email
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.user) {
        return rejectWithValue("User not logged in");
      }

      const response = await axios.get(
        "http://108.181.173.121:6061/api/userRegistration/get",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      // Find the logged-in user from all users
      const loggedInUser = response.data.find(
        (user) => user.email === auth.user.email
      );

      return loggedInUser || rejectWithValue("User not found");
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    profile: JSON.parse(localStorage.getItem("authProfile")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authProfile");
      state.user = null;
      state.token = null;
      state.profile = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

// Login
.addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = { email: action.payload.email };
  state.token = action.payload.token;
  localStorage.setItem("authToken", action.payload.token);
  localStorage.setItem("authUser", JSON.stringify({ email: action.payload.email }));
})

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
