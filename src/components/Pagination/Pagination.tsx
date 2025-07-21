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
    <div className={styles.root}>
      <button
        className={currentPage === 1 ? styles.selected : ''}
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        {prevButtonLabel}
      </button>
      {pagesButtons.map((page) => (
        <button
          className={page === currentPage ? styles.selected : ''}
          disabled={page === currentPage}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={currentPage === pageCount ? styles.selected : ''}
        disabled={currentPage === pageCount}
        onClick={handleNext}
      >
        {nextButtonLabel}
      </button>
    </div>
  );
};
