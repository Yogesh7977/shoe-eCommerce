import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registrationcredentials: {
    name: "",
    email: "",
    number: "",
    password: "",
  },

  loginCredentials: {
    email: "",
    password: "",
  },
  profileDetails: null,
};

export const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateRegistrationCredentials: (state, action) => {
      const { field, value } = action.payload;
      state.registrationcredentials[field] = value;
    },
    resetRegistrationCredentials: (state) => {
      state.registrationcredentials = {
        name: "",
        email: "",
        number: "",
        password: "",
      };
    },
    updateLoginCredentials: (state, action) => {
      const { field, value } = action.payload;
      state.loginCredentials[field] = value;
    },
    resetLoginCredentials: (state) => {
      state.loginCredentials = {
        email: "",
        password: "",
        };
    },
    updateProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },
  },
});

export const { updateRegistrationCredentials, resetRegistrationCredentials, updateLoginCredentials, resetLoginCredentials, updateProfileDetails } = authslice.actions;

export default authslice.reducer;
