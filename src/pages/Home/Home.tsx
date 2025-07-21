import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import { setCategoryId, setPageCount, setCurrentPage } from '../../store/filters/slice';
import { Categories } from '../../components/Categories/Categories';
import { Sort } from '../../components/Sort/Sort';
import { PizzaCard } from '../../components/PizzaCard/PizzaCard';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Pagination } from '../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { useGetPizzasQuery } from '../../store/pizzas/pizzasApi';
import { ITEMS_PER_PAGE } from '../../constants/apiConstants';
import { IPizza, TOrder, TSortProperty } from '@/types/apiTypes';
import { filtersSelector } from '../../store/filters/selectors';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const { categoryId: category, sort, currentPage, searchValue } = useSelector(filtersSelector);
  const sortBy: TSortProperty = sort.sortProperty;

  const [order, setOrder] = useState<TOrder>('asc');

  const {
    data: pizzasData,
    isLoading,
    isError,
    isFetching,
    error,
  } = useGetPizzasQuery({
    category,
    sortBy,
    order,
    searchValue,
    page: currentPage || 1,
  });

  const pizzas: IPizza[] = useMemo(() => pizzasData?.items || [], [pizzasData?.items]);
  const totalItems: number = useMemo(() => pizzasData?.totalItems || 0, [pizzasData?.totalItems]);
  const pageCount: number = useMemo(
    () => (totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 0),
    [totalItems]
  );

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortBy,
          category,
          page: currentPage,
          order,
          search: searchValue,
        },
        { skipNulls: true }
      );
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortBy, order, currentPage, searchValue, navigate]);

  useEffect(() => {
    if (totalItems !== null && totalItems >= 0) {
      dispatch(setPageCount(pageCount));
    }
  }, [totalItems, pageCount, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPizzas = pizzas.map((pizza: IPizza) => <PizzaCard key={pizza.id} {...pizza} />);
  const skeleton = [...Array(8)].map((_, index) => <Skeleton key={index} />);

  const handleToggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };

  let content: React.ReactNode;

  if (isLoading || isFetching) {
    content = skeleton;
  } else if (error && 'status' in error && error.status === 404) {
    content = <div>Пиццы не найдены</div>;
  } else if (isError) {
    content = <div>Произошла ошибка</div>;
  } else {
    content = renderPizzas.length > 0 ? renderPizzas : <div>Пиццы не найдены</div>;
  }

  return (
    <div className='content'>
      <div className='content__top'>
        <Categories categoryId={category} onClickCategory={handleChangeCategory} />
        <Sort onChangeOrder={handleToggleOrder} order={order} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>{content}</div>
      {!isLoading && pizzas.length > 0 && !isError && (
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          currentPage={currentPage}
          prevButtonLabel={'<'}
          nextButtonLabel={'>'}
          isLoading
        />
      )}
    </div>
  );
};
