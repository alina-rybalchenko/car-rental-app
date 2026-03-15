import { PulseLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div
      className="center"
      style={{
        minHeight: '300px',
        justifyContent: 'center',
      }}
    >
      <PulseLoader color="#3470ff" size={12} />
    </div>
  );
}
