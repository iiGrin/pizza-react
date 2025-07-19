import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { setSort } from '../../store/slices/filtersSlice';
import { SORT_FILTERS } from '../../constants/filtersConstants';
import styles from './Sort.module.scss';
import { TOrder, TSortOptions } from '@/types/apiTypes';

interface IProps {
  onChangeOrder: () => void;
  order: TOrder;
}

export const Sort = ({ onChangeOrder, order }: IProps) => {
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filters.sort);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleSort = () => {
    setOpen(!open);
  };

  const handleSelectSort = (sortOption: TSortOptions) => {
    dispatch(setSort(sortOption));
    setOpen(false);
  };

  return (
    <div className={styles.sort} ref={sortRef}>
      <div className={styles.sortLabel}>
        <button className={styles.orderBtn} onClick={onChangeOrder}>
          <ArrowDropDownIcon
            sx={{
              transform: order === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
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
                className={
                  sort.sortProperty === sortOption.sortProperty ? 'active' : ''
                }
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
