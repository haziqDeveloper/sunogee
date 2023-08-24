import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
// import authSlice from './pages/redux/authSlice';  
// import { login } from "./store/slices/auth";
import auth from '../src/store/slices/auth';

export default configureStore({
  reducer: {
       auth,
      //  [login.reducerPath]:login.reducerPath
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(login.middleware),
});

// setupListeners(store.dispatch);

