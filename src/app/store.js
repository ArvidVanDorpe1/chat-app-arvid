import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/Reducers/userSlice";
import appReducer from "../features/Reducers/appSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
