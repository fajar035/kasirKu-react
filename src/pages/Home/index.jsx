import Products from '../../components/Products';

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Products />
    </div>
  );
}
