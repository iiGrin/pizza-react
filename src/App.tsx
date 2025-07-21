import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { NotFound } from './pages/NotFound/NotFound';
import { Cart } from './pages/Cart/Cart';
import { DetailPizza } from './pages/DetailsPizza/DetailPizza';
import MainLayout from './layouts/MainLayout/MainLayout';
import './styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/pizzas/:id' element={<DetailPizza />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
