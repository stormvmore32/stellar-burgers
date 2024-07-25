import { error } from 'console';
import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
  error?: Error | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle,
  error: null
};

export const getFeeds = createAsyncThunk('feeds/getFeeds', getFeedsApi);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeeds.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.error = new Error('Failed loading feeds data');
    });
  },
  selectors: {
    selectorFeedsData: (state: TFeedState) => state.orders,
    selectorFeedsTotal: (state: TFeedState) => state.total,
    selectorFeedsTotalToday: (state: TFeedState) => state.totalToday
  }
});

export const selectorFeeds = feedsSlice.selectors;
export const feedsReducer = feedsSlice.reducer;
