import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

export type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
  error?: Error | null;
};

const initialState: TIngredientState = {
  data: [],
  status: RequestStatus.Idle,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.data = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.status = RequestStatus.Failed;
      state.error = new Error('Loading data is failed');
    });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientState) => state.data,
    selectorIngredientsState: (state: TIngredientState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
