import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// export const getOrders = createAsyncThunk<TOrder[]>(
//   'orders/getOrders',
//   getOrdersApi
// );

export const postOrder = createAsyncThunk(
  'order/post',
  async (order: string[]) => {
    orderBurgerApi(order);
  }
);
