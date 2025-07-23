import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPizzaCart } from '../../store/cart/slice';
import { IPizza } from '@/types/apiTypes';
import { DOUGH_TYPES } from '../../constants/filtersConstants';
import { cartSelector } from '../../store/cart/selectors';

export const PizzaCard = ({ id, title, price, imageUrl, sizes, types }: IPizza) => {
  const dispatch = useDispatch();
  const { pizzasCart } = useSelector(cartSelector);

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const totalAddedCount = useSelector((state) =>
    pizzasCart.reduce((sum, pizza) => {
      if (pizza.id === id) {
        return sum + pizza.count;
      }
      return sum;
    }, 0)
  );

  const handleAddPizza = () => {
    const pizza = {
      id,
      title,
      price,
      imageUrl,
      type: DOUGH_TYPES[activeType],
      size: sizes[activeSize],
    };
    dispatch(addPizzaCart(pizza));
  };

  return (
    <article className='pizza-block' aria-label={`Пицца ${title}`}>
      <figure className='pizza-block__image-wrapper'>
        <img className='pizza-block__image' src={imageUrl} alt={`Пицца ${title}`} />
      </figure>
      <header className='pizza-block__header'>
        <h4 className='pizza-block__title'>{title}</h4>
      </header>

      <div className='pizza-block__selector' aria-label='Выбор параметров пиццы'>
        <ul aria-label='Тип теста'>
          {types.map((type, index) => (
            <li
              key={index}
              className={activeType === index ? 'active' : ''}
              onClick={() => setActiveType(index)}
              role='button'
              aria-pressed={activeType === index}
              tabIndex={0}
            >
              {DOUGH_TYPES[type]}
            </li>
          ))}
        </ul>
        <ul aria-label='Размер пиццы'>
          {sizes.map((size, index) => (
            <li
              key={index}
              className={activeSize === index ? 'active' : ''}
              onClick={() => setActiveSize(index)}
              role='button'
              aria-pressed={activeSize === index}
              tabIndex={0}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>

      <footer className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button
          onClick={handleAddPizza}
          className='button button--outline button--add'
          aria-label={`Добавить пиццу ${title}`}
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {totalAddedCount > 0 && (
            <i aria-label={`Добавлено ${totalAddedCount}`}>{totalAddedCount}</i>
          )}
        </button>
      </footer>
    </article>
  );
};
