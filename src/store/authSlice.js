import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://75.119.134.82:6060/api/userRegistration",
        userData
      );

      const token = response.data.token;
      const profileData = {
        name: userData.name || 'Not provided',
        email: userData.email,
        phoneNo: userData.phoneNo || 'Not provided',
      };

      // Since new users are normally 'user' role
      const role = "user"; 

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify({ email: userData.email }));
      localStorage.setItem("authProfile", JSON.stringify(profileData));
      localStorage.setItem("authRole", role);

      return {
        token,
        email: userData.email,
        profile: profileData,
        role
      };
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
        "http://75.119.134.82:6060/login",
        credentials
      );

      const token = response.data.token;
      
      // 🔥 Suppose you check email to decide role
      let role = "user"; 
      if (credentials.email === "admin@example.com") {
        role = "admin"; // Hardcode admin for now
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify({ email: credentials.email }));
      localStorage.setItem("authRole", role);

      return {
        token,
        email: credentials.email,
        role
      };
    } catch (error) {
      if (!error.response) {
        return rejectWithValue("Network error. Please try again.");
      }
      return rejectWithValue(error.response.data?.message || "Invalid email or password");
    }
  }
);

// Async thunk for fetching profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      if (!auth.user?.email) {
        return rejectWithValue("User not logged in");
      }

      const response = await axios.get(
        "http://75.119.134.82:6060/api/userRegistration/get"
      );

      const loggedInUser = response.data.find(
        (user) => user.email === auth.user.email
      );

      if (!loggedInUser) {
        return rejectWithValue("User profile not found");
      }

      const profileData = {
        name: loggedInUser.name || 'Not provided',
        email: loggedInUser.email,
        phoneNo: loggedInUser.phoneNo || 'Not provided',
      };

      localStorage.setItem("authProfile", JSON.stringify(profileData));

      return profileData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Load initial auth state from localStorage
const loadInitialState = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("authUser"));
  const profile = JSON.parse(localStorage.getItem("authProfile"));
  const role = localStorage.getItem("authRole");

  return {
    user: user || null,
    token: token || null,
    profile: profile || null,
    role: role || null,
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authProfile");
      localStorage.removeItem("authRole");
      state.user = null;
      state.token = null;
      state.profile = null;
      state.role = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { email: action.payload.email };
        state.token = action.payload.token;
        state.profile = action.payload.profile;
        state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { email: action.payload.email };
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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
