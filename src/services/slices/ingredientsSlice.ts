import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

type TIngredientState = {
  data: TIngredient[];
  status: RequestStatus;
};

const initialState: TIngredientState = {
  data: [],
  status: RequestStatus.Idle
};

export const getIngredients = createAsyncThunk<TIngredient[]>(
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
    });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientState) => state.data,
    selectorIngredientsState: (state: TIngredientState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
