import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  role: "",
  timezone: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload }; //send user's info into the store
    },
    updateUserField: (state, action) => {    //update user's info based on the action.payload
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setUser, updateUserField } = userSlice.actions;
export default userSlice.reducer;
