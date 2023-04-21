/** @format */

import { createSlice } from '@reduxjs/toolkit';

const initialState = [] as any;

const DialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    addDialogItem: (state, action) => {
      const data = action.payload as any;
      //有就更新，没有就添加
      const index = state.findIndex((item) => item.id === data.id);
      if (index > -1) {
        state[index] = data;
      } else {
        state.push(data);
      }
    },
    deleteDialog: (state, action) => {
      const data = action.payload as any;
      const index = state.findIndex((item) => item.id === data.id);
      if (index > -1) {
        state.splice(index, 1);
      }
    },
  },
});
export const { addDialogItem, deleteDialog } = DialogSlice.actions;
export default DialogSlice.reducer;
