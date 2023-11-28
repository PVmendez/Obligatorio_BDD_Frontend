import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isLoading: false
};

const defaultRoles = [2001, 5150];

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    verifiedRoles: (state, action) => {
      const { roles } = action.payload;
      const userRoles = roles.filter((role) => defaultRoles.includes(role));
      console.log(userRoles.includes(5150));
      state.isAdmin = userRoles.includes(5150);
    },
    loadingChanges: (state, action) => {
        const { isLoading } = action.payload;
        state.isLoading = isLoading;
    }
  },
});

export const { verifiedRoles, loadingChanges } = authSlice.actions;
export default authSlice.reducer;
