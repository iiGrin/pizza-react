import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <section className={styles.root} aria-labelledby='not-found-heading'>
      <h1 id='not-found-heading'>
        <span role='img' aria-label='Смущенное лицо'>
          😕
        </span>
        <br />
        Ничего не найдено
      </h1>
      <p className={styles.description}>
        К сожалению, данная страница отсутствует в нашем интернет-магазине.
      </p>
    </section>
  );
};
