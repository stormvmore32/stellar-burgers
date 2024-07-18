import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

export type TOrderState = {
  info: TOrder[];
  status: RequestStatus;
};

const initialState: TOrderState = {
  info: [],
  status: RequestStatus.Idle
};

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrders',
  getOrderByNumberApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.status = RequestStatus.Idle;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.info = action.payload.orders;
    });
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});
