import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';
import { SORT_FILTERS } from '../../constants/filtersConstants';

const getInitialFilters = () => {
  if (typeof window !== 'undefined') {
    const params = qs.parse(window.location.search.substring(1));
    const sort = SORT_FILTERS.find(obj => obj.value === params.sortBy);

    return {
      searchValue: '',
      categoryId: Number(params.category) || 0,
      currentPage: Number(params.page) || 1,
      sort: sort || SORT_FILTERS[0],
    };
  }

  return {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: SORT_FILTERS[0],
  };
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: getInitialFilters(),
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = action.payload.currentPage;
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
      state.currentPage = 1;
      state.categoryId = 0;
    },
  },
});

export const { setCategoryId, setSort, setPageCount, setCurrentPage, setFilters, setSearchValue } = filtersSlice.actions;
export default filtersSlice.reducer;