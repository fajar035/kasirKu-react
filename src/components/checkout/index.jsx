import { UilTrashAlt } from '@iconscout/react-unicons';
import './styles.css';

function Checkout({ product, removeCart }) {
  return (
    <div className="card-product">
      <img src={product.picture} alt="product" width={50} />
      <div className="title-product">
        <p>{product.name}</p>
        <p>Rp.{product.price}</p>
      </div>
      <UilTrashAlt
        className="icon-cart"
        onClick={() => removeCart(product.id)}
      />
    </div>
  );
}

export default Checkout;
