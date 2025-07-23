import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import MainLayout from './layouts/MainLayout/MainLayout';
import './styles/app.scss';

const Cart = lazy(
  () => import(/* webpackChunkName: "Cart" */ './pages/Cart/Cart')
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound/NotFound')
);
const DetailPizza = lazy(
  () =>
    import(
      /* webpackChunkName: "DetailPizza" */ './pages/DetailsPizza/DetailPizza'
    )
);

function App() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/pizzas/:id' element={<DetailPizza />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
