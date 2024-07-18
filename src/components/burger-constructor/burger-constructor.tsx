import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectorConstructor } from '@slices/burgerConsructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const { selectorBurgerBun, selectorBurgerIngredient } = selectorConstructor;
  const bun = useSelector(selectorBurgerBun);
  const ingredient = useSelector(selectorBurgerIngredient);

  const constructorItems = {
    bun: bun,
    ingredients: ingredient
  };

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    console.log(constructorItems);
  };
  const closeOrderModal = () => {};

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
