import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectorFeeds } from '../../services/slices/feedSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  // const orders: TOrder[] = [];
  const { selectorFeedsData, selectorFeedsTotal, selectorFeedsTotalToday } =
    selectorFeeds;
  const orders: TOrder[] = useSelector(selectorFeedsData);
  const feed = {
    total: useSelector(selectorFeedsTotal),
    totalToday: useSelector(selectorFeedsTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
