import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import {
  registerDB,
  loginDB,
  logoutDB,
  updateUserProfile,
} from "../services/userService";
import { auth } from "../../firebase/config";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registration: {
      reducer: (state, action) => {
        state.user = action.payload;
      },
      prepare: async ({ login, email, password }) => {
        await registerDB(email, password);
        await updateUserProfile({
          displayName: login,
        });
  
        const userUpdateSuccess = auth.currentUser;
        console.log("Registered and logged in as", auth.currentUser.email);
        return userUpdateSuccess;
      },
    },
    logIn: {
      reducer: (state, action) => {
        console.log(1, action.payload);

        state.user = action.payload;
      },
      prepare: async (user) => {
        await loginDB(user.email, user.password);
        const userUpdateSuccess = auth.currentUser;
        console.log("Logged in as", auth.currentUser);
        console.log(2, action.payload);
        return userUpdateSuccess;
      },
    },
    logOut: (state) => {
      state.user = {};
      console.log("Logged out", state.user);
      logoutDB();
    },
  },
});
  
export const { registration, logIn, logOut, fetchUserData } = userSlice.actions;
export default userSlice.reducer;
  