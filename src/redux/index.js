import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountSlice";
import places from "./reducers/places";

export default configureStore({
  reducer: {
    account: accountReducer,
    ...places,
  },
});
