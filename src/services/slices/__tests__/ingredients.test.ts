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

  it('when request is status - "pending" status = Loading, data = []', () => {
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

  it('when request is status - "reject" status = Failed, data = [], error = error message', () => {
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

  it('when request is status - "fulfilled" status = Success, data = TIngredientState[]', () => {
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
