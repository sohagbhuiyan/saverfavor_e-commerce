// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { API_BASE_URL } from "./api";
// import axios from "axios";

// // Async thunk for registration
// export const registerUser = createAsyncThunk(
//   "auth/register",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/api/userRegistration`, userData);

//       const token = data.token;
//       const userId = data.user?.id || null;
//       const profileData = {
//         id: userId,
//         name: data.user?.name || userData.name || 'Not provided',
//         email: data.user?.email || userData.email,
//         phoneNo: data.user?.phoneNo || userData.phoneNo || 'Not provided',
//       };
//       const role = "user";

//       saveAuthData({ token, email: profileData.email, role, profileData, userId });

//       console.log("Registered User ID:", userId, "Email:", profileData.email);

//       return { token, email: profileData.email, profile: profileData, role, userId };
//     } catch (error) {
//       console.error("Registration error:", error.response?.data);
//       return rejectWithValue(error.response?.data || "Registration failed");
//     }
//   }
// );

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/login`, credentials);

//       const token = data?.token;
//       const userId = data?.user?.id || null;
//       const role = credentials.email === "admin@example.com" ? "admin" : "user";

//       if (!token) {
//         return rejectWithValue("Token missing in response. Check backend.");
//       }

//       saveAuthData({ token, email: credentials.email, role, userId });

//       console.log("Logged in User ID:", userId, "Email:", credentials.email);

//       return { token, email: credentials.email, role, userId };
//     } catch (error) {
//       console.error("Login error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Invalid email or password");
//     }
//   }
// );

// // Async thunk for fetching user profile
// export const fetchProfile = createAsyncThunk(
//   "auth/fetchProfile",
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { auth } = getState();
//       const userEmail = auth.user?.email;

//       if (!userEmail) {
//         return rejectWithValue("User not logged in");
//       }

//       const { data } = await axios.get(`${API_BASE_URL}/api/userRegistration/get`);

//       const loggedInUser = data.find((user) => user.email === userEmail);

//       if (!loggedInUser) {
//         return rejectWithValue("User profile not found");
//       }

//       const profileData = {
//         id: loggedInUser.id,
//         name: loggedInUser.name || 'Not provided',
//         email: loggedInUser.email,
//         phoneNo: loggedInUser.phoneNo || 'Not provided',
//       };

//       localStorage.setItem("authProfile", JSON.stringify(profileData));
//       localStorage.setItem("authUserId", profileData.id);

//       console.log("Fetched User ID from profile:", profileData.id, "Email:", profileData.email);

//       return profileData;
//     } catch (error) {
//       console.error("Fetch profile error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
//     }
//   }
// );

// // Helper: Save Auth Data to localStorage
// const saveAuthData = ({ token, email, role, profileData, userId }) => {
//   if (token) localStorage.setItem("authToken", token);
//   if (email || userId) localStorage.setItem("authUser", JSON.stringify({ email, id: userId }));
//   if (role) localStorage.setItem("authRole", role);
//   if (userId) localStorage.setItem("authUserId", userId);
//   if (profileData) localStorage.setItem("authProfile", JSON.stringify(profileData));
// };

// // Helper: Load Initial State from localStorage
// const loadInitialState = () => {
//   const token = localStorage.getItem("authToken");
//   const user = JSON.parse(localStorage.getItem("authUser")) || {};
//   const profile = JSON.parse(localStorage.getItem("authProfile"));
//   const role = localStorage.getItem("authRole");
//   const userId = localStorage.getItem("authUserId");

//   return {
//     user: user.email ? { email: user.email, id: userId } : null,
//     token: token || null,
//     profile: profile || null,
//     role: role || null,
//     loading: false,
//     error: null,
//   };
// };

// // Create auth slice
// const authSlice = createSlice({
//   name: "auth",
//   initialState: loadInitialState(),
//   reducers: {
//     logout: (state) => {
//       localStorage.clear();
//       state.user = null;
//       state.token = null;
//       state.profile = null;
//       state.role = null;
//       state.loading = false;
//       state.error = null;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.user = { email: payload.email, id: payload.userId };
//         state.token = payload.token;
//         state.profile = payload.profile;
//         state.role = payload.role;
//       })
//       .addCase(registerUser.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       })

//       // Login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.user = { email: payload.email, id: payload.userId };
//         state.token = payload.token;
//         state.role = payload.role;
//       })
//       .addCase(loginUser.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       })

//       // Fetch Profile
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfile.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.profile = payload;
//         state.user = {
//           ...state.user,
//           id: payload.id,
//         };
//       })
//       .addCase(fetchProfile.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       });
//   },
// });

// export const { logout, clearError } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "./api";
import axios from "axios";

// Async thunk for registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/userRegistration`, userData);

      const token = data.token;
      const userId = data.user?.id || null;
      const profileData = {
        id: userId,
        name: data.user?.name || userData.name || "Not provided",
        email: data.user?.email || userData.email,
        phoneNo: data.user?.phoneNo || userData.phoneNo || "Not provided",
      };
      const role = data.user?.role || "user"; // Backend should return role

      saveAuthData({ token, email: profileData.email, role, profileData, userId });

      console.log("Registered User ID:", userId, "Email:", profileData.email);

      return { token, email: profileData.email, profile: profileData, role, userId };
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/login`, credentials);

      const token = data?.token;
      const userId = data?.user?.id || null;
      const role = data?.user?.role || (credentials.email === "admin@example.com" ? "admin" : "user");

      if (!token) {
        return rejectWithValue("Token missing in response. Check backend.");
      }

      saveAuthData({ token, email: credentials.email, role, userId });

      console.log("Logged in User ID:", userId, "Email:", credentials.email);

      return { token, email: credentials.email, role, userId };
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Invalid email or password");
    }
  }
);

// Async thunk for validating token
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue("No token found");
      }

      const { data } = await axios.get(`${API_BASE_URL}/api/validateToken`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userId = data.user?.id || null;
      const email = data.user?.email || auth.user?.email;
      const role = data.user?.role || auth.role;

      return { token, email, role, userId };
    } catch (error) {
      console.error("Token validation error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Invalid token");
    }
  }
);

// Async thunk for fetching user profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      if (!token) {
        return rejectWithValue("User not logged in");
      }

      const { data } = await axios.get(`${API_BASE_URL}/api/userRegistration/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = {
        id: data.id,
        name: data.name || "Not provided",
        email: data.email,
        phoneNo: data.phoneNo || "Not provided",
      };

      localStorage.setItem("authProfile", JSON.stringify(profileData));
      localStorage.setItem("authUserId", profileData.id);

      console.log("Fetched User ID from profile:", profileData.id, "Email:", profileData.email);

      return profileData;
    } catch (error) {
      console.error("Fetch profile error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Helper: Save Auth Data to localStorage
const saveAuthData = ({ token, email, role, profileData, userId }) => {
  if (token) localStorage.setItem("authToken", token);
  if (email || userId) localStorage.setItem("authUser", JSON.stringify({ email, id: userId }));
  if (role) localStorage.setItem("authRole", role);
  if (userId) localStorage.setItem("authUserId", userId);
  if (profileData) localStorage.setItem("authProfile", JSON.stringify(profileData));
};

// Helper: Load Initial State from localStorage
const loadInitialState = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("authUser")) || {};
  const profile = JSON.parse(localStorage.getItem("authProfile"));
  const role = localStorage.getItem("authRole");
  const userId = localStorage.getItem("authUserId");

  return {
    user: user.email && userId ? { email: user.email, id: userId } : null,
    token: token || null,
    profile: profile || null,
    role: role || null,
    loading: false,
    error: null,
    isValidating: false,
  };
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
      state.profile = null;
      state.role = null;
      state.loading = false;
      state.error = null;
      state.isValidating = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { email: payload.email, id: payload.userId };
        state.token = payload.token;
        state.profile = payload.profile;
        state.role = payload.role;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = { email: payload.email, id: payload.userId };
        state.token = payload.token;
        state.role = payload.role;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      // Validate Token
      .addCase(validateToken.pending, (state) => {
        state.isValidating = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, { payload }) => {
        state.isValidating = false;
        state.user = { email: payload.email, id: payload.userId };
        state.token = payload.token;
        state.role = payload.role;
      })
      .addCase(validateToken.rejected, (state, { payload }) => {
        state.isValidating = false;
        state.error = payload;
        state.user = null;
        state.token = null;
        state.role = null;
        state.profile = null;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = payload;
        state.user = {
          ...state.user,
          id: payload.id,
        };
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
