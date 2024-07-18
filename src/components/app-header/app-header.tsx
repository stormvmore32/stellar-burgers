import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const { selectorGetUser } = userSelectors;
  const userData = useSelector(selectorGetUser);
  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
