// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';

const store = configureStore({
    reducer: {
      auth: authReducer,
      // Add other reducers here
    },
    // Add middleware, devTools, etc.,
  });

export default store;
