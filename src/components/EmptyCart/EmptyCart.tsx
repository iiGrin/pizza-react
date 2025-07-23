import { Link } from 'react-router-dom';

import cartEmptyImg from '../../assets/img/empty-cart.png';
import styles from './EmptyCart.module.scss';

export const EmptyCart = () => {
  return (
    <section className={styles.emptyCart} aria-labelledby='empty-cart-heading'>
      <h2 id='empty-cart-heading'>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt='Пустая корзина' role='presentation' />
      <Link to='/' className='button button--black'>
        <span>Вернуться назад</span>
      </Link>
    </section>
  );
};
