import Products from '../../components/Products';
import Users from '../../components/Users';
import './styles.css';

export default function Home() {
  return (
    <section className="section-home">
      <Products />
      <Users />
    </section>
  );
}
