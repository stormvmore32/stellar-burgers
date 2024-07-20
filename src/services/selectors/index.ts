import { RootState } from '../store';

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
