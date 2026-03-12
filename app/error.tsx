'use client';

import Button from '@/components/shared/Button/Button';
import Container from '@/components/shared/Container/Container';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <main style={{ padding: '80px 0', textAlign: 'center' }}>
      <Container>
        <h2>Something went wrong</h2>

        <p style={{ marginTop: '12px', color: '#666' }}>
          {error.message || 'An unexpected error occurred.'}
        </p>

        <div style={{ marginTop: '24px' }}>
          <Button onClick={reset}>Try again</Button>
        </div>
      </Container>
    </main>
  );
}
