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
//       const user = data.user;

//       const userId = user?.id || null;
//       const role = user?.role?.toLowerCase() || "user";

//       const profileData = {
//         id: userId,
//         name: user?.name || userData.name || "Not provided",
//         email: user?.email || userData.email,
//         phoneNo: user?.phoneNo || userData.phoneNo || "Not provided",
//       };

//       saveAuthData({ token, email: profileData.email, role, profileData, userId });

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
//       const user = data?.user;
//       const userId = user?.id || null;
//       const role = user?.role?.toLowerCase() || "user";

//       if (!token) {
//         return rejectWithValue("Token missing in response. Check backend.");
//       }

//       const profileData = {
//         id: userId,
//         name: user?.name || "Not provided",
//         email: user?.email,
//         phoneNo: user?.phoneNo || "Not provided",
//       };

//       saveAuthData({ token, email: user?.email, role, profileData, userId });

//       return { token, email: user?.email, profile: profileData, role, userId };
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
//         name: loggedInUser.name || "Not provided",
//         email: loggedInUser.email,
//         phoneNo: loggedInUser.phoneNo || "Not provided",
//       };

//       localStorage.setItem("authProfile", JSON.stringify(profileData));
//       localStorage.setItem("authUserId", profileData.id);

//       return profileData;
//     } catch (error) {
//       console.error("Fetch profile error:", error.response?.data);
//       return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
//     }
//   }
// );

// // Save Auth Data to localStorage
// const saveAuthData = ({ token, email, role, profileData, userId }) => {
//   if (token) localStorage.setItem("authToken", token);
//   if (email || userId) localStorage.setItem("authUser", JSON.stringify({ email, id: userId }));
//   if (role) localStorage.setItem("authRole", role);
//   if (userId) localStorage.setItem("authUserId", userId);
//   if (profileData) localStorage.setItem("authProfile", JSON.stringify(profileData));
// };

// // Load Initial State from localStorage
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

// // Auth slice
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

//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.user = { email: payload.email, id: payload.userId };
//         state.token = payload.token;
//         state.profile = payload.profile;
//         state.role = payload.role;
//       })
//       .addCase(loginUser.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//       })

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
      const userId = data._id || null;

      const profileData = {
        id: userId,
        name: data.name || userData.name || "Not provided",
        email: data.email || userData.email,
        phoneNo: data.phoneNo || userData.phoneNo || "Not provided",
      };

      const role = data.role?.toLowerCase() || "admin";

      saveAuthData({ token, email: profileData.email, role, profileData, userId });

      console.log("Registered User ID:", userId, "Email:", profileData.email, "Role:", role);

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
      const user = data?.user || {};
      const userId = user?.id || user?._id || null;

      if (!token) {
        return rejectWithValue("Token missing in response. Check backend.");
      }

      const email = credentials.email;

      // Extract role from user.authorities or user.role
      const role =
        (Array.isArray(user.authorities) && user.authorities[0]?.authority?.toLowerCase()) ||
        user?.role?.toLowerCase() ||
        "admin";

      saveAuthData({ token, email, role, userId });

      console.log("Logged in User ID:", userId, "Email:", email, "Role:", role);

      return { token, email, role, userId };
    } catch (error) {
      console.error("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Invalid email or password");
    }
  }
);

// Async thunk for fetching user profile
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userEmail = auth.user?.email;

      if (!userEmail) {
        return rejectWithValue("User not logged in");
      }

      const { data } = await axios.get(`${API_BASE_URL}/api/userRegistration/get`);
      const loggedInUser = data.find((user) => user.email === userEmail);

      if (!loggedInUser) {
        return rejectWithValue("User profile not found");
      }

      const profileData = {
        id: loggedInUser.id || loggedInUser._id || null,
        name: loggedInUser.name || "Not provided",
        email: loggedInUser.email,
        phoneNo: loggedInUser.phoneNo || "Not provided",
      };

      const role =
        (Array.isArray(loggedInUser.authorities) &&
          loggedInUser.authorities[0]?.authority?.toLowerCase()) ||
        loggedInUser?.role?.toLowerCase() ||
        "user";

      localStorage.setItem("authProfile", JSON.stringify(profileData));
      localStorage.setItem("authUserId", profileData.id);
      localStorage.setItem("authRole", role);

      console.log("Fetched User ID:", profileData.id, "Email:", profileData.email, "Role:", role);

      return { ...profileData, role };
    } catch (error) {
      console.error("Fetch profile error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Save Auth Data to localStorage
const saveAuthData = ({ token, email, role, profileData, userId }) => {
  if (token) localStorage.setItem("authToken", token);
  if (email || userId) localStorage.setItem("authUser", JSON.stringify({ email, id: userId }));
  if (role) localStorage.setItem("authRole", role);
  if (userId) localStorage.setItem("authUserId", userId);
  if (profileData) localStorage.setItem("authProfile", JSON.stringify(profileData));
};

// Load initial state from localStorage
const loadInitialState = () => {
  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("authUser")) || {};
  const profile = JSON.parse(localStorage.getItem("authProfile"));
  const role = localStorage.getItem("authRole");
  const userId = localStorage.getItem("authUserId");

  return {
    user: user.email ? { email: user.email, id: userId } : null,
    token: token || null,
    profile: profile || null,
    role: role || null,
    loading: false,
    error: null,
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

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profile = {
          name: payload.name,
          email: payload.email,
          phoneNo: payload.phoneNo,
          id: payload.id,
        };
        state.user = {
          ...state.user,
          id: payload.id,
          email: payload.email,
        };
        state.role = payload.role || state.role;
      })
      .addCase(fetchProfile.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
