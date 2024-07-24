import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  let statusText = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      statusText = 'Готовится';
      break;
    case 'done':
      textStyle = '#00CCCC';
      statusText = 'Выполнен';
      break;
    default:
      textStyle = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={textStyle} text={statusText} />;
};
