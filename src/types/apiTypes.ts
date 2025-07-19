import { PIZZA_SIZES, DOUGH_TYPES } from '@/constants/filtersConstants';

export type TOrder = 'asc' | 'desc';

export type TSortOptions = {
  name: string;
  sortProperty: string;
};

export type PizzaSize = (typeof PIZZA_SIZES)[number];
export type PizzaType = (typeof DOUGH_TYPES)[number];

export interface IPizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: PizzaSize[];
  types: PizzaType[];
}

export interface IPizzasCart extends IPizza {
  count: number;
  type: PizzaType;
  size: PizzaSize;
}
