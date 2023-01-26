import './styles.css';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Users({ users, isError, handleSelectedUser }) {
  const handleChangeUser = (e) => {
    handleSelectedUser(e.target.value);
  };

  useEffect(() => {
    if (isError)
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
  }, [isError]);

  return (
    <>
      <div className="section-users">
        <div className="select-users">
          <p>Select Users</p>
        </div>
        <div className="wrapper-users">
          <select
            className="dropdown-users"
            onChange={(e) => handleChangeUser(e)}>
            {users?.map((user, idx) => {
              return (
                <option className="option-dropdown" key={idx} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
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
    </>
  );
}

export default Users;
