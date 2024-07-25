import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
  error?: Error | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle,
  error: null
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

export const updateUser = createAsyncThunk<TUserResponse, TUser>(
  'userSlice/updateUser',
  updateUserApi
);

export const logoutUser = createAsyncThunk(
  'userSlice/logout',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(logout());
      })
      .catch(() => {
        console.log('Failed');
      });
  }
);

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.data = null;
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
        state.error = new Error('Failed check auth user');
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
        state.error = new Error('Failed registration');
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
        state.error = new Error('Failed login');
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.error = new Error('Failed update user');
      });
  },
  selectors: {
    selectorGetUser: (state: TUserState) => state.data,
    selectorGetIsAuthChecked: (state: TUserState) => state.isAuthChecked
  }
});

export const userSelectors = userSlice.selectors;
export const { authCheck, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
