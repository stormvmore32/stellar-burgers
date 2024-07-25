import { TNewOrderResponse, TOrderResponse } from '@api';
import {
  clearOrder,
  getOrderByNumber,
  orderReducer,
  postOrder,
  TOrderState
} from '@slices/orderSlice';
import { TOrder } from '@utils-types';

const initialState: TOrderState = {
  newOrderData: null,
  newOrderStatus: false,
  newOrderError: null,
  orderByNumber: null,
  orderByNumberStatus: false,
  orderByNumberError: null
};

const testData: TOrder[] = [
  {
    _id: '6696ebdd119d45001b4f9551',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Краторный space бургер',
    createdAt: '2024-07-16T21:53:33.971Z',
    updatedAt: '2024-07-16T21:53:35.875Z',
    number: 1
  }
];

const testOrder: string[] = [
  '643d69a5c3f7b9001cfa093d',
  '643d69a5c3f7b9001cfa093f',
  '643d69a5c3f7b9001cfa0940',
  '643d69a5c3f7b9001cfa0946',
  '643d69a5c3f7b9001cfa0949',
  '643d69a5c3f7b9001cfa0944'
];

const newOrderResponse: TNewOrderResponse = {
  success: true,
  order: testData[0],
  name: 'Test Burger'
};

const orderByNumberResponse: TOrderResponse = {
  success: true,
  orders: testData
};

describe('test order slice', () => {
  describe('test sync func', () => {
    it('should handle clearOrder change the field "newOrderData" to null', () => {
      const actualState = orderReducer(
        { ...initialState, newOrderData: testData[0] },
        clearOrder()
      );
      expect(actualState).toEqual(initialState);
    });
  });
  describe('test async func', () => {
    it('should set field newOrderStatus to true when postOrder.pending', () => {
      const actualState = orderReducer(
        initialState,
        postOrder.pending('', testOrder)
      );
      expect(actualState).toEqual({
        ...initialState,
        newOrderStatus: true
      });
    });
    it('should set field newOrderStatus to false, newOrderData to testData when postOrder.fulfilled', () => {
      const actualState = orderReducer(
        initialState,
        postOrder.fulfilled(newOrderResponse, '', testOrder)
      );
      expect(actualState).toEqual({
        ...initialState,
        newOrderStatus: false,
        newOrderData: testData[0]
      });
    });
    it('should set field newOrderStatus to false, newOrderError to "Failed post order"  when postOrder.rejected', () => {
      const actualState = orderReducer(
        initialState,
        postOrder.rejected(new Error(), '', testOrder)
      );
      expect(actualState).toEqual({
        ...initialState,
        newOrderStatus: false,
        newOrderError: new Error('Failed post order')
      });
    });
    it('should set field orderByNumberStatus to true when getOrderByNumber.pending', () => {
      const actualState = orderReducer(
        initialState,
        getOrderByNumber.pending('', 1)
      );
      expect(actualState).toEqual({
        ...initialState,
        orderByNumberStatus: true
      });
    });
    it('should set field orderByNumberStatus to false, newOrderData to testData when getOrderByNumber.fulfilled', () => {
      const actualState = orderReducer(
        initialState,
        getOrderByNumber.fulfilled(orderByNumberResponse, '', 1)
      );
      expect(actualState).toEqual({
        ...initialState,
        orderByNumberStatus: false,
        orderByNumber: testData[0]
      });
    });
    it('should set field orderByNumberStatus to false, newOrderError "Failed get order by number" when getOrderByNumber.rejected', () => {
      const actualState = orderReducer(
        initialState,
        getOrderByNumber.rejected(new Error(), '', 1)
      );
      expect(actualState).toEqual({
        ...initialState,
        orderByNumberStatus: false,
        orderByNumberError: new Error('Failed get order by number')
      });
    });
  });
});
