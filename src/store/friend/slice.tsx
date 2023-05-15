/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const FriendSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    initFriendInfo: (state, action) => {
      const data = action.payload as any;
      Object.keys(data).forEach((key) => {
        state[key] = data[key];
      });
    },
    addFriend: (state, action) => {
      const data = action.payload as any;
      state[data.id] = data;
    },
  },
});
export const { addFriend, initFriendInfo } = FriendSlice.actions;
export default FriendSlice.reducer;
