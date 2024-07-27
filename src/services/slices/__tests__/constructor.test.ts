import {
  addIngredient,
  burgerReducer,
  changeRecipe,
  clearConstructor,
  removeIngredient,
  TBurgerConstructorState
} from '@slices/burgerConstructorSlice';

const mockData = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('test constructor slice', () => {
  const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: []
  };

  it('should must add ingredient with type "main" or "sauce" when valid data is passed', () => {
    const newState = burgerReducer(initialState, addIngredient(mockData[0]));
    expect(newState.ingredients.length).toEqual(
      1 + initialState.ingredients.length
    );
    expect(newState.ingredients[0]).toEqual({
      ...mockData[0],
      id: expect.any(String)
    });
  });

  it('should add ingredient with type "bun" when valid data is passed', () => {
    const newState = burgerReducer(initialState, addIngredient(mockData[1]));
    expect(newState.bun).toEqual({
      ...mockData[1],
      id: expect.any(String)
    });
  });

  it('should remove item by id when valid data is passed', () => {
    const expectedResult = mockData.slice(0, 2);
    const newState = burgerReducer(
      { bun: null, ingredients: mockData },
      removeIngredient(2)
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: expectedResult
    });
  });

  it('should change the order of components when the corresponding button is pressed', () => {
    const expectedResult = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
      }
    ];
    const newState = burgerReducer(
      { bun: null, ingredients: mockData },
      changeRecipe({ from: 0, to: 1 })
    );
    expect(newState).toEqual({ bun: null, ingredients: expectedResult });
  });

  it('should clear the date "field" when the call', () => {
    const newState = burgerReducer(
      { bun: null, ingredients: mockData },
      clearConstructor()
    );
    expect(newState).toEqual(initialState);
  });
});
