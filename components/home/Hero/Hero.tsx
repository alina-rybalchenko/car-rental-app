import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <div className={`container ${css.heroContainer}`}>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>Find your perfect rental car</h1>

          <p className={css.description}>
            Reliable and budget-friendly rentals for any journey
          </p>

          <Link href="/catalog" className={css.button}>
            View Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
