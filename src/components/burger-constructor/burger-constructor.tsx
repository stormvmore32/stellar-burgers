import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import {
  clearConstructor,
  selectorConstructor
} from '@slices/burgerConsructorSlice';
import { useDispatch } from '../../services/store';
import { clearOrder, postOrder, selectorsOrder } from '@slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSelectors } from '@slices/userSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { selectorBurgerBun, selectorBurgerIngredient } = selectorConstructor;
  const { selectorNewOrderData, selectorNewOrderStatus } = selectorsOrder;
  const bun = useSelector(selectorBurgerBun);
  const ingredient = useSelector(selectorBurgerIngredient);
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.selectorGetUser);
  const navigation = useNavigate();

  const constructorItems = {
    bun: bun,
    ingredients: ingredient
  };

  const orderRequest = useSelector(selectorNewOrderStatus);
  const orderModalData = useSelector(selectorNewOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigation('/login');
    } else {
      const data: string[] = [
        constructorItems.bun!._id,
        ...constructorItems.ingredients.map((el) => el._id)
      ];
      dispatch(postOrder(data));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  // const price = useMemo(
  //   () =>
  //     (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
  //     constructorItems.ingredients.reduce(
  //       (s: number, v: TConstructorIngredient) => s + v.price,
  //       0
  //     ),
  //   [constructorItems]
  // );

  const price = useMemo(
    () =>
      constructorItems.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      ) + (constructorItems.bun ? constructorItems.bun.price * 2 : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
