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

  const handleSubmitcheckout = () => {
    const d = new Date();
    const date2 = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    const dateNow = `${date2} ${time}`;

    const body = {
      id_user: selectUser,
      date: dateNow,
      total,
    };

    if (selectProduct.length !== 0) {
      addTransactionApi(body)
        .then((res) => {
          if (res.data.status === 201) {
            setSelectProduct([]);
            return toast.success('Checkout Successfully ...', {
              position: 'bottom-center',
              autoClose: 2000,
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
            return toast.error('Something went wrong !', {
              position: 'bottom-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: 'colored',
            });
        });
    } else {
      return toast.warning('Please check out first !', {
        position: 'bottom-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
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
          <p>List Item</p>
          {selectProduct.length !== 0 ? (
            <div className="product-cart">
              {selectProduct.map((item, idx) => {
                return (
                  <Checkout key={idx} product={item} removeCart={removeCart} />
                );
              })}
            </div>
          ) : (
            <div className="no-data">
              <p>No Data</p>
            </div>
          )}
          <div className="wrapper-submit">
            <p>Total : Rp.{total}</p>
            <button type="button" onClick={handleSubmitcheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
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
