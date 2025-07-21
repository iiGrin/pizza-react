import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import qs from 'qs';
import { SORT_FILTERS } from '../../constants/filtersConstants';
import { ISortOptions } from '@/types/apiTypes';

interface FiltersSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ISortOptions;
  pageCount: number;
}

const getInitialFilters = (): FiltersSliceState => {
  if (typeof window !== 'undefined') {
    const params = qs.parse(window.location.search.substring(1));
    const sort = SORT_FILTERS.find((obj) => obj.sortProperty === params.sortBy);

    return {
      searchValue: (params.searchValue as string) || '',
      categoryId: Number(params.category) || 0,
      currentPage: Number(params.page) || 1,
      sort: sort || SORT_FILTERS[0],
      pageCount: 0,
    };
  }

  return {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: SORT_FILTERS[0],
    pageCount: 0,
  };
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: getInitialFilters(),
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<ISortOptions>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(
      state,
      action: PayloadAction<{
        currentPage: number;
        categoryId: number;
        sort: ISortOptions;
      }>
    ) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      if (state.categoryId !== 0) state.categoryId = 0;
      if (state.currentPage !== 1) state.currentPage = 1;
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setCurrentPage, setFilters, setSearchValue } =
  filtersSlice.actions;
export default filtersSlice.reducer;
