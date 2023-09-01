import { createSlice } from "@reduxjs/toolkit";
import { signIn, signUp, signOut } from "./firebaseService";

const handlePending = state => {
    state.loading = true;
};
  
const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload;
};

const handleFulfilled = (state, action) => {
    state.loading = false;
    state.user = action.payload;
}

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(signUp.pending, handlePending)
        .addCase(signIn.pending, handlePending)
        .addCase(signOut.pending,handlePending)

        .addCase(signUp.rejected,handleRejected)
        .addCase(signIn.rejected, handleRejected)
        .addCase(signOut.rejected, handleRejected)

        .addCase(signUp.fulfilled, handleFulfilled)
        .addCase(signIn.fulfilled, handleFulfilled)
        .addCase(signOut.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
        });
    },
});
