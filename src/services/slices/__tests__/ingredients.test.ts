import { RequestStatus } from '@utils-types';
import {
  getIngredients,
  ingredientsReducer,
  TIngredientState
} from '../ingredientsSlice';

describe('test slice ingredients', () => {
  const initialState: TIngredientState = {
    data: [],
    status: RequestStatus.Idle,
    error: null
  };

  it('should set status = Loading, data = [] when getIngredients.pending', () => {
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      data: [],
      status: 'Loading',
      error: null
    });
  });

  it('should set status = Failed, data = [], error = error message when getIngredients.rejected', () => {
    const actualState = ingredientsReducer(
      { ...initialState },
      getIngredients.rejected(new Error(), '')
    );

    expect(actualState).toEqual({
      data: [],
      status: 'Failed',
      error: new Error('Loading data is failed')
    });
  });

  it('should set status = Success, data = TIngredientState[] when getIngredients.fulfilled', () => {
    const testData = [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'type1',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 150,
        price: 1.5,
        image: 'image1',
        image_large: 'large1',
        image_mobile: 'mobile1'
      }
    ];
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredients.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      data: testData,
      status: 'Success',
      error: null
    });
  });
});
