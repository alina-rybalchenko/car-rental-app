import { PulseLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div
      className="center"
      style={{
        minHeight: '60vh',
        justifyContent: 'center',
      }}
    >
      <PulseLoader color="#3470ff" size={12} />
    </div>
  );
}
