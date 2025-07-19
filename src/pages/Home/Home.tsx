import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';

import {
  setCategoryId,
  setPageCount,
  setCurrentPage,
} from '../../store/slices/filtersSlice';
import { Categories } from '../../components/Categories/Categories';
import { Sort } from '../../components/Sort/Sort';
import { PizzaCard } from '../../components/PizzaCard/PizzaCard';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Pagination } from '../../components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import { useGetPizzasQuery } from '../../store/slices/pizzasApi';
import { ITEMS_PER_PAGE } from '../../constants/apiConstants';
import { IPizza, TOrder } from '@/types/apiTypes';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const {
    categoryId: category,
    sort,
    currentPage,
    searchValue,
  } = useSelector((state) => state.filters);
  const sortBy = sort.sortProperty;

  const [order, setOrder] = useState<TOrder>('asc');

  const {
    data: pizzasData,
    isLoading,
    isError,
    isFetching,
  } = useGetPizzasQuery({
    category: category || 0,
    sortBy,
    order,
    searchValue,
    page: currentPage || 1,
  });

  const pizzas = pizzasData?.items || [];
  const totalItems = pizzasData?.totalItems || 0;
  const pageCount = totalItems > 0 ? Math.ceil(totalItems / ITEMS_PER_PAGE) : 0;

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy,
        category,
        page: currentPage,
        order,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [category, sortBy, order, currentPage, navigate]);

  useEffect(() => {
    if (totalItems !== null && totalItems >= 0) {
      const calculatedPageCount = Math.ceil(totalItems / ITEMS_PER_PAGE);
      dispatch(setPageCount(calculatedPageCount));
    }
  }, [totalItems, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPizzas = pizzas.map((pizza: IPizza) => (
    <PizzaCard key={pizza.id} {...pizza} />
  ));
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
  let content;

  if (isLoading || isFetching) {
    content = skeleton;
  } else if (isError) {
    content = <div>Произошла ошибка</div>;
  } else {
    content =
      renderPizzas.length > 0 ? renderPizzas : <div>Пиццы не найдены</div>;
  }

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={category}
          onClickCategory={handleChangeCategory}
        />
        <Sort onChangeOrder={handleToggleOrder} order={order} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{content}</div>
      {!isLoading && pizzas.length > 0 && (
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
