import { ISortOptions } from '../types/apiTypes';

export const SORT_FILTERS: ISortOptions[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
] as const;

export const CATEGORIES = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
] as const;

export const PIZZA_SIZES = [26, 30, 40] as const;
export const DOUGH_TYPES = ['тонкое', 'традиционное'] as const;
