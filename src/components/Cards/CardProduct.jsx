import './styles.css';

function CardProduct({ img, name, price }) {
  return (
    <div className="wrapper-card-product">
      <div className="wrapper-img-product">
        <img src={img} alt="img" className="img-product" />
      </div>
      <div className="wrapper-text-card">
        <p>{name}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default CardProduct;
