import { getorderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrderState = {
  newOrderData: TOrder | null;
  newOrderStatus: boolean;
  newOrderError?: Error | null;
  orderByNumber: TOrder | null;
  orderByNumberStatus: boolean;
  orderByNumberError?: Error | null;
};

const initialState: TOrderState = {
  newOrderData: null,
  newOrderStatus: false,
  newOrderError: null,
  orderByNumber: null,
  orderByNumberStatus: false,
  orderByNumberError: null
};

export const postOrder = createAsyncThunk(
  'order/postOrder',
  async (order: string[]) => {
    const data = await orderBurgerApi(order);
    return data;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrder',
  getorderByNumberApi
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.newOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.orderByNumberStatus = true;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderByNumberStatus = false;
      state.orderByNumber = action.payload.orders[0];
    });
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.orderByNumberStatus = false;
      state.orderByNumberError = new Error('Failed get order by number');
    });
    builder.addCase(postOrder.pending, (state) => {
      state.newOrderStatus = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.newOrderStatus = false;
      state.newOrderData = action.payload.order;
    });
    builder.addCase(postOrder.rejected, (state) => {
      state.newOrderStatus = false;
      state.newOrderError = new Error('Failed post order');
    });
  },
  selectors: {
    selectorNewOrderData: (state: TOrderState) => state.newOrderData,
    selectorNewOrderStatus: (state: TOrderState) => state.newOrderStatus,
    selectorOrderByNum: (state: TOrderState) => state.orderByNumber
  }
});

export const { clearOrder } = orderSlice.actions;
export const selectorsOrder = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
