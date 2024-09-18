import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utils/utils";

const initialState = {
  user: getLocalStorage("userData"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValueUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setValueUser } = authSlice.actions;

export default authSlice.reducer;
