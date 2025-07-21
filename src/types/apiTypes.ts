import { PIZZA_SIZES, DOUGH_TYPES } from '@/constants/filtersConstants';

export type TOrder = 'asc' | 'desc';
export type TSortProperty = 'rating' | 'price' | 'title';

export interface ISortOptions {
  name: string;
  sortProperty: TSortProperty;
}

export type PizzaSize = (typeof PIZZA_SIZES)[number];
export type PizzaType = (typeof DOUGH_TYPES)[number];

export interface IPizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: PizzaSize[];
  types: number[];
  rating: number;
}

export interface ICartPizza extends IPizza {
  count: number;
  type: PizzaType;
  size: PizzaSize;
}
