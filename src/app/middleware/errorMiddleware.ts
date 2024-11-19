import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';

export const errorMiddleware: Middleware = () => (next) => (action) => {
  // Check if the action is a rejected API call
  if (isRejectedWithValue(action)) {
    // Here you can handle errors globally
    console.error('API Error:', action.payload);
    
    // You could dispatch a notification action here
    // store.dispatch(showNotification({ type: 'error', message: action.payload.message }));
  }

  return next(action);
};