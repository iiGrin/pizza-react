import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, ITEMS_PER_PAGE } from '../../constants/apiConstants';

export const pizzasApi = createApi({
  reducerPath: 'pizzasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL
  }),
  tagTypes: ['Pizzas'],
  endpoints: (builder) => ({
    getPizzas: builder.query({
      query: ({ category, sortBy, order, searchValue, page }) => {
        const params = {
          page,
          limit: ITEMS_PER_PAGE,
          sortBy,
          order,
          ...(category !== 0 && { category: category }),
          ...(searchValue && { search: searchValue }),
        }

        return {
          url: '',
          params
        }
      },
      transformResponse: async (response, meta, arg) => {
        const countParams = {
          sortBy: arg.sortBy,
          order: arg.order,
          ...(arg.category !== 0 && { category: arg.category }),
          ...(arg.searchValue && { search: arg.searchValue }),
        }

        const countResponse = await fetch(`${BASE_URL}?${new URLSearchParams(countParams).toString()}`)
        const totalItemsData = await countResponse.json();
        const totalItems = Array.isArray(totalItemsData) ? totalItemsData.length : 0;

        return {
          items: response,
          totalItems: totalItems,
        };
      }
    })
  })
})

export const { useGetPizzasQuery } = pizzasApi;
