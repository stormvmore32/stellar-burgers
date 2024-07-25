import { getOrders, ordersReducer, TOrdersState } from '@slices/ordersSlice';
import { RequestStatus } from '@utils-types';
import { error } from 'console';

describe('test orders slice', () => {
  const initialState: TOrdersState = {
    orders: [],
    status: RequestStatus.Idle,
    error: null
  };
  it('when request is status - "pending" status = Loading, orders = []', () => {
    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrders.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      status: RequestStatus.Loading,
      error: null
    });
  });
  it('when request is status - "reject" status = Failed, orders = [], error = error mesage', () => {
    const actualState = ordersReducer(
      { ...initialState },
      getOrders.rejected(new Error(), '')
    );

    expect(actualState).toEqual({
      orders: [],
      status: 'Failed',
      error: new Error('Failed loading orders data')
    });
  });

  it('when request is status - "fulfilled" status = Success, orders = TOrder[]', () => {
    const testData = [
      {
        _id: '6696ebdd119d45001b4f9551',
        ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
        status: 'done',
        name: 'Краторный space бургер',
        createdAt: '2024-07-16T21:53:33.971Z',
        updatedAt: '2024-07-16T21:53:35.875Z',
        number: 46007
      }
    ];
    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrders.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orders: testData,
      status: 'Success',
      error: null
    });
  });
});
