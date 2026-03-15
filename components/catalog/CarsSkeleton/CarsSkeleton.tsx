import css from './CarsSkeleton.module.css';

export default function CarsSkeleton() {
  return (
    <ul className={css.list}>
      {Array.from({ length: 8 }).map((_, index) => (
        <li key={index} className={css.card}>
          <div className={css.image} />
          <div className={css.lineLg} />
          <div className={css.lineSm} />
          <div className={css.lineSm} />
          <div className={css.button} />
        </li>
      ))}
    </ul>
  );
}
