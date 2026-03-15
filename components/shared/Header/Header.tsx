'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <Link
            href="/"
            className={css.logoLink}
            aria-label="RentalCar home page"
          >
            <svg className={css.logo} aria-hidden="true">
              <use href="/icons.svg#icon-rental-car" />
            </svg>
          </Link>

          <nav aria-label="Main navigation">
            <ul className={css.navList}>
              <li>
                <Link
                  href="/"
                  className={css.navLink}
                  aria-current={pathname === '/' ? 'page' : undefined}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={css.navLink}
                  aria-current={pathname === '/catalog' ? 'page' : undefined}
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
