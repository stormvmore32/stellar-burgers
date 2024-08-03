import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

export type TOrdersState = {
  orders: TOrder[];
  status: RequestStatus;
  error?: Error | null;
};

const initialState: TOrdersState = {
  orders: [],
  status: RequestStatus.Idle,
  error: null
};

export const getOrders = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  getOrdersApi
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrders.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.orders = action.payload;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.error = new Error('Failed loading orders data');
    });
  },
  selectors: {
    selectorOrdersData: (state: TOrdersState) => state.orders
  }
});

export const selectorsOrders = ordersSlice.selectors;
export const ordersReducer = ordersSlice.reducer;
