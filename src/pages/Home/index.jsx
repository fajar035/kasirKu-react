import { useCallback, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Checkout from '../../components/checkout';
import Products from '../../components/Products';
import Users from '../../components/Users';
import dataProducts from '../../utils/Data';
import { getAllUsersApi } from '../../utils/https/users';
import { addTransactionApi } from '../../utils/https/transactions';
import './styles.css';

function Home() {
  const [users, setusers] = useState([]);
  const [error, setError] = useState(false);
  const [selectUser, setSelectUser] = useState(1);
  const [selectProduct, setSelectProduct] = useState([]);
  const [total, setTotal] = useState(0);

  const getAllUsers = useCallback(() => {
    getAllUsersApi()
      .then((res) => {
        setusers(res.data.data);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [getAllUsersApi]);

  const handleSubmitcheckout = useCallback(() => {
    const d = new Date();
    const date2 = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    const dateNow = `${date2} ${time}`;

    const body = {
      id_user: selectUser,
      date: dateNow,
      total,
    };

    addTransactionApi(body)
      .then((res) => {
        if (res.data.status === 201) {
          setSelectProduct([]);
          return toast.success('Berhasil Checkout ...', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          });
        }
      })
      .catch((err) => {
        if (err)
          return toast.error('Terjadi Kesalahan !', {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'colored',
          });
      });
  }, [addTransactionApi]);

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
    const totalPrice = selectProduct
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);
    setTotal(totalPrice);
  }, [selectProduct, total]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <section className="section-home">
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
          <div className="wrapper-submit">
            <p>Total : Rp.{total}</p>
            <button type="button" onClick={handleSubmitcheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      />
    </section>
  );
}

export default Home;
