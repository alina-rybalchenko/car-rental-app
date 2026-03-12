import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="center"
      style={{
        minHeight: '70vh',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '48px' }}>404</h1>

      <p style={{ marginTop: '12px' }}>
        The page you are looking for does not exist.
      </p>

      <Link
        href="/"
        style={{
          marginTop: '24px',
          display: 'inline-block',
          color: '#3470ff',
          fontWeight: 600,
        }}
      >
        Go back to Home
      </Link>
    </main>
  );
}
