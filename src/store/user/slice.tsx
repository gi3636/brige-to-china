/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // username: '123',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const data = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(data));
      return {
        ...state,
        ...data,
      };
    },
    userLogout: (state) => initialState,
  },
});
export const { updateUser, userLogout } = UserSlice.actions;
export default UserSlice.reducer;
