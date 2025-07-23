import { CATEGORIES } from '../../constants/filtersConstants';
import styles from './Categories.module.scss';

interface IProps {
  categoryId: number;
  onClickCategory: (index: number) => void;
}

export const Categories = ({ categoryId, onClickCategory }: IProps) => {
  return (
    <nav className={styles.categories} aria-label='Категории пиццы'>
      <ul>
        {CATEGORIES.map((category, index) => (
          <li key={index}>
            <button
              type='button'
              onClick={() => onClickCategory(index)}
              className={categoryId === index ? styles.active : ''}
              style={{ cursor: 'pointer', width: '100%' }}
              role='tab'
              aria-selected={categoryId === index}
              aria-controls={`panel-${category.toLowerCase().replace(/\s/g, '-')}`}
              id={`tab-${category.toLowerCase().replace(/\s/g, '-')}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
