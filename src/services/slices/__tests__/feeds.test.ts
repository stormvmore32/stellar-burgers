import { feedsReducer, getFeeds, TFeedState } from '@slices/feedSlice';
import { RequestStatus } from '@utils-types';

describe('test feeds slice', () => {
  const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    status: RequestStatus.Idle,
    error: null
  };
  it('should set status = Loading, orders = [], total = 0, totalToday = 0 when getFeeds.pending', () => {
    const actualState = feedsReducer(
      {
        ...initialState
      },
      getFeeds.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading,
      error: null
    });
  });
  it('should set status = Failed, orders = [], total = 0, totalToday = 0 when getFeeds.rejected', () => {
    const actualState = feedsReducer(
      { ...initialState },
      getFeeds.rejected(new Error(), '')
    );

    expect(actualState).toEqual({
      orders: [],
      status: 'Failed',
      total: 0,
      totalToday: 0,
      error: new Error('Failed loading feeds data')
    });
  });

  it('should set status = Success, orders = TOrder[] when getFeeds.fulfilled', () => {
    const testData = {
      orders: [
        {
          _id: '6696ebdd119d45001b4f9551',
          ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0943'],
          status: 'done',
          name: 'Краторный space бургер',
          createdAt: '2024-07-16T21:53:33.971Z',
          updatedAt: '2024-07-16T21:53:35.875Z',
          number: 46007
        }
      ],
      success: true,
      total: 1,
      totalToday: 1
    };
    const actualState = feedsReducer(
      {
        ...initialState,
        total: 1,
        totalToday: 1
      },
      getFeeds.fulfilled(testData, '')
    );

    expect(actualState).toEqual({
      orders: testData.orders,
      status: 'Success',
      total: 1,
      totalToday: 1,
      error: null
    });
  });
});
