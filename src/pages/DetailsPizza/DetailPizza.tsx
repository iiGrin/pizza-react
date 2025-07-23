import { useGetPizzaByIdQuery } from '../../store/pizzas/pizzasApi';
import { useParams, useNavigate } from 'react-router-dom';

const DetailPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pizza, isError, isLoading } = useGetPizzaByIdQuery(id || '');

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!pizza || isError) {
    return <div>Произошла ошибка</div>;
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default DetailPizza;
