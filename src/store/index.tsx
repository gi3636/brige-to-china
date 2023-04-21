/** @format */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import UserReducer from './user/slice';
import DialogReducer from './dialog/slice';
import ThemeReducer from './config/slice';
import FriendReducer from './friend/slice';

// 合并多个reducer
const rootReducer = combineReducers({
  user: UserReducer,
  theme: ThemeReducer,
  dialog: DialogReducer,
  friends: FriendReducer,
});
const store = configureStore({
  reducer: rootReducer,
  // 可以添加自己的中间件,比如打印日志的
  //middleware: getDefaultMiddleware => [...getDefaultMiddleware()],
  devTools: true,
});

// 获取全部store数据类型
export type RootState = ReturnType<typeof store.getState>;

export default store;
