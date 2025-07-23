import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { setSort } from '../../store/filters/slice';
import { SORT_FILTERS } from '../../constants/filtersConstants';
import { ISortOptions, TOrder, TSortProperty } from '@/types/apiTypes';
import { filtersSelector } from '../../store/filters/selectors';
import styles from './Sort.module.scss';

interface IProps {
  onChangeOrder: () => void;
  order: TOrder;
}

export const Sort = ({ onChangeOrder, order }: IProps) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { sort } = useSelector(filtersSelector);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleSort = () => {
    setOpen(!open);
  };

  const handleSelectSort = (sortOption: ISortOptions) => {
    dispatch(setSort(sortOption));
    setOpen(false);
  };

  return (
    <div className={styles.sort} ref={sortRef}>
      <div className={styles.sortLabel}>
        <button className={styles.orderBtn} onClick={onChangeOrder}>
          <ArrowDropDownIcon
            sx={
              order === 'asc'
                ? {
                    transform: 'rotate(180deg)',
                    transition: 'all 0.3s ease-in-out',
                  }
                : { transform: 'rotate(0)', transition: 'all 0.3s ease-in-out' }
            }
          />
        </button>
        <b>Сортировка по:</b>
        <span onClick={handleToggleSort}>{sort.name}</span>
      </div>
      {open && (
        <div className={styles.sortPopup}>
          <ul>
            {SORT_FILTERS.map((sortOption, index) => (
              <li
                key={index}
                className={sort.sortProperty === sortOption.sortProperty ? 'active' : ''}
                onClick={() => handleSelectSort(sortOption)}
              >
                {sortOption.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
