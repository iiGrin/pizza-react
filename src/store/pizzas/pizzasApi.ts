import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ITEMS_PER_PAGE } from '../../constants/apiConstants';
import { IPizza, TOrder, TSortProperty } from '@/types/apiTypes';

interface GetPizzasQueryParams {
  category: number;
  sortBy: TSortProperty;
  order: TOrder;
  searchValue: string;
  page: number;
}

interface GetPizzasResponse {
  items: IPizza[];
  totalItems: number;
}

export const pizzasApi = createApi({
  reducerPath: 'pizzasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Pizzas'],
  endpoints: (builder) => ({
    getPizzas: builder.query<GetPizzasResponse, GetPizzasQueryParams>({
      query: ({ category, sortBy, order, searchValue, page }) => {
        const params = {
          page,
          limit: ITEMS_PER_PAGE,
          sortBy,
          order,
          ...(category !== 0 && { category: category }),
          ...(searchValue && { search: searchValue }),
        };

        return {
          url: '',
          params,
        };
      },
      transformResponse: async (response: IPizza[], meta, arg) => {
        const countParams: Record<string, string | number> = {
          sortBy: arg.sortBy,
          order: arg.order,
          ...(arg.category !== 0 && { category: arg.category }),
          ...(arg.searchValue && { search: arg.searchValue }),
        };

        const queryParams = new URLSearchParams(countParams).toString();
        const countResponse = await fetch(`${BASE_URL}?${queryParams}`);
        const totalItemsData: IPizza[] = await countResponse.json();
        const totalItems = Array.isArray(totalItemsData)
          ? totalItemsData.length
          : 0;

        return {
          items: response,
          totalItems: totalItems,
        };
      },
    }),
    getPizzaById: builder.query<IPizza, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetPizzasQuery, useGetPizzaByIdQuery } = pizzasApi;
