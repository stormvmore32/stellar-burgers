import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { selectorsOrders } from '@slices/ordersSlice';
import { selectorFeeds } from '@slices/feedSlice';
import { selectorsOrder } from '@slices/orderSlice';

export const orderInfoData = (number: string) => (state: RootState) => {
  if (state.orders.orders.length) {
    const data = state.orders.orders.find((el) => el.number === +number);
    if (data) return data;
  }

  if (state.feeds.orders.length) {
    const data = state.orders.orders.find((el) => el.number === +number);
    if (data) return data;
  }

  if (state.order.OrderByNumber?.number === +number) {
    const data = state.order.OrderByNumber;
    if (data) return data;
  }

  return null;
};

// export const orderInfoDat = (number: string) => {
//   const dataOrders = useSelector(selectorsOrders.selectorOrdersData);
//   const dataFeeds = useSelector(selectorFeeds.selectorFeedsData);
//   const dataOrder = useSelector(selectorsOrder.selectorOrderByNum);

//   if (dataOrders) {
//     const data = dataOrders.find((el) => el.number === +number);
//     if (data) return data;
//   }
//   if (dataFeeds) {
//     const data = dataFeeds.find((el) => {
//       el.number === +number;
//     });
//     if (data) return data;
//   }
//   if (dataOrder?.number === +number) {
//     const data = dataOrder;
//     if (data) return data;
//   }

//   return null;
// };
