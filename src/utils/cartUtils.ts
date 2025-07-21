import { ICartPizza } from '@/types/apiTypes';

export const calculateTotalPrice = (pizzas: ICartPizza[]): number => {
  return pizzas.reduce((sum, item) => sum + item.price * item.count, 0);
};

export const calculateTotalCount = (pizzas: ICartPizza[]): number => {
  return pizzas.reduce((sum, item) => sum + item.count, 0);
};