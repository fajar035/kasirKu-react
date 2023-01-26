import './styles.css';

function Products({ products, handleSelectedProduct }) {
  const handleSelect = (product) => {
    handleSelectedProduct(product);
  };
  return (
    <div className="wrapper-products">
      {products.map((product, idx) => (
        <div key={idx} className="wrapper-card-product">
          <div className="wrapper-img-product">
            <img src={product.picture} alt="img" className="img-product" />
          </div>
          <div className="wrapper-text-card">
            <p>{product.name}</p>
            <p>Rp.{product.price}</p>
          </div>
          <button
            type="button"
            className="btn-buy"
            onClick={() => handleSelect(product)}>
            Checkout
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
