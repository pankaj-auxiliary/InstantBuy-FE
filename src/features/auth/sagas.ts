import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { loginRequest, loginSuccess, loginFailure } from './slice';
import { User } from '../../types/auth';

// Simulated API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function* loginSaga(action: PayloadAction<{ email: string; password: string }>) {
  try {
    // Simulate API call
    yield call(delay, 1000);
    
    // Mock user data
    const user: User = {
      id: '1',
      name: 'John Doe',
      email: action.payload.email,
      role: 'buyer',
      phone: '+1 (555) 123-4567',
    };
    
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'Login failed'));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
}