import { CATEGORIES } from '../../constants/filtersConstants';

interface IProps {
  categoryId: number;
  onClickCategory: (index: number) => void;
}

export const Categories = ({ categoryId, onClickCategory }: IProps) => {
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={categoryId === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
