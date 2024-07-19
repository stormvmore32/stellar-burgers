import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

export type TOrderState = {
  newOrderData: TOrder | null;
  newOrderStatus: boolean;
  OrderByNumber: TOrder | null;
  OrderByNumberStatus: boolean;
};

const initialState: TOrderState = {
  newOrderData: null,
  newOrderStatus: false,
  OrderByNumber: null,
  OrderByNumberStatus: false
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
  getOrderByNumberApi
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
      state.OrderByNumberStatus = true;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.OrderByNumberStatus = false;
      state.OrderByNumber = action.payload.orders[0];
    });
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.OrderByNumberStatus = false;
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
    });
  },
  selectors: {
    selectorNewOrderData: (state: TOrderState) => state.newOrderData,
    selectorNewOrderStatus: (state: TOrderState) => state.newOrderStatus,
    selectorOrderByNum: (state: TOrderState) => state.OrderByNumber
  }
});

export const { clearOrder } = orderSlice.actions;
export const selectorsOrder = orderSlice.selectors;
