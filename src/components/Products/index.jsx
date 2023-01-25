import dataProducts from '../../utils/Data';
import CardProduct from '../Cards/CardProduct';
import './styles.css';

function Products() {
  return (
    <div className="wrapper-products">
      {dataProducts.map((product, idx) => (
        <CardProduct
          key={idx}
          img={product.picture}
          name={product.name}
          price={product.price}
        />
      ))}
    </div>
  );
}

export default Products;
