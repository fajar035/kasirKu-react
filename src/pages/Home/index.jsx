import { useEffect, useState } from 'react';
import Checkout from '../../components/checkout';
import Products from '../../components/Products';
import Users from '../../components/Users';
import dataProducts from '../../utils/Data';
import { getAllUsersApi } from '../../utils/https/users';
import './styles.css';

function Home() {
  // add transaction = id, total(product+), date
  // add transaction to api
  const [users, setusers] = useState([]);
  const [error, setError] = useState(false);
  const [selectUser, setSelectUser] = useState(null);
  const [selectProduct, setSelectProduct] = useState([]);

  const getAllUsers = () => {
    getAllUsersApi()
      .then((res) => {
        setusers(res.data.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleSelectedUser = (id) => {
    setSelectUser(id);
  };

  const handleSelectedProduct = (product) => {
    setSelectProduct([...selectProduct, product]);
  };

  const removeCart = (id) => {
    const newCart =
      selectProduct.length !== 0 &&
      selectProduct.filter((itemRemove) => itemRemove.id !== id);
    setSelectProduct(newCart);
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <section className="section-home">
      <p>{selectUser}</p>

      <Products
        products={dataProducts}
        handleSelectedProduct={handleSelectedProduct}
      />
      <div className="wrapper-left">
        <Users
          users={users}
          isError={error}
          handleSelectedUser={handleSelectedUser}
        />
        <div className="wrapper-chart">
          <p>Checkout</p>
          <div className="product-cart">
            {selectProduct.map((item, idx) => {
              return (
                <Checkout key={idx} product={item} removeCart={removeCart} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
