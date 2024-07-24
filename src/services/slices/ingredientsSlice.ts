import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

type TIngredientState = {
  data: TIngredient[];
  status: boolean;
};

const initialState: TIngredientState = {
  data: [],
  status: false
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
      state.status = false;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.status = true;
      state.data = action.payload;
    });
    builder.addCase(getIngredients.rejected, (state) => {
      state.status = false;
    });
  },
  selectors: {
    selectorIngredientsData: (state: TIngredientState) => state.data,
    selectorIngredientsState: (state: TIngredientState) => state.status
  }
});

export const selectorIngredients = ingredientsSlice.selectors;
