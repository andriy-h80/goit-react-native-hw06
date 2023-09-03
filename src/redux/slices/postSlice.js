import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { writePostToFirestore } from "../services/postService";

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.post = action.payload;
      console.log("addPost", state.post);
      writePostToFirestore(
        state.post.photo,
        state.post.title,
        state.post.locationName,
        state.post.location
      );
    },
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;
