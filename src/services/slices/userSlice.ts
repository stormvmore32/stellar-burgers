import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const checkUserAuth = createAsyncThunk<TUserResponse>(
  'userSlice/checkAuth',
  getUserApi
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'userSlice/registerUser',
  async (dataUser) => {
    const data = await registerUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'userSlice/loginUser',
  async (dataUser) => {
    const data = await loginUserApi(dataUser);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    selectorGetUser: (state: TUserState) => state.data,
    selectorGetIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userSelectors = userSlice.selectors;
export const { authCheck } = userSlice.actions;
