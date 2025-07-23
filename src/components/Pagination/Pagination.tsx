import styles from './Pagination.module.scss';

interface IProps {
  onPageChange: (page: number) => void;
  pageCount: number;
  currentPage: number;
  prevButtonLabel: string;
  nextButtonLabel: string;
  isLoading?: boolean;
}

export const Pagination = ({
  onPageChange,
  pageCount,
  currentPage,
  prevButtonLabel,
  nextButtonLabel,
}: IProps) => {
  const pagesButtons = Array(pageCount)
    .fill(0)
    .map((_, index) => index + 1);

  const handlePrev = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <nav className={styles.root} aria-label='Навигация по страницам'>
      <button
        type='button'
        className={currentPage === 1 ? styles.selected : ''}
        disabled={currentPage === 1}
        onClick={handlePrev}
        aria-label={prevButtonLabel}
      >
        {prevButtonLabel}
      </button>
      <ul>
        {pagesButtons.map((page) => (
          <li key={page}>
            <button
              type='button'
              className={page === currentPage ? styles.selected : ''}
              disabled={page === currentPage}
              key={page}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Страница ${page}`}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
      <button
        type='button'
        className={currentPage === pageCount ? styles.selected : ''}
        disabled={currentPage === pageCount}
        onClick={handleNext}
        aria-label={nextButtonLabel}
      >
        {nextButtonLabel}
      </button>
    </nav>
  );
};
