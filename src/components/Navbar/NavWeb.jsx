import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  UilApps,
  UilEstate,
  UilInvoice,
  UilTimes,
} from '@iconscout/react-unicons';
import './styles.css';

function NavWeb() {
  const location = useLocation();
  const { pathname } = location;
  const [windowsSize, setWindowsSize] = useState(window.innerWidth);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => setIsOpenMenu(!isOpenMenu);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowsSize(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return (
    <header>
      {isOpenMenu || windowsSize >= 768 ? (
        <section className="navbar">
          <h1>KasirKu</h1>
          <ul className="wrapper-menu">
            {windowsSize <= 750 ? (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={`link navlink-bottom ${
                      pathname === '/' ? 'active' : null
                    }`}>
                    <UilEstate />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="transactions"
                    className={`link navlink-bottom ${
                      pathname === '/transactions' ? 'active' : null
                    }`}>
                    <UilInvoice />
                    Transactions
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={`link ${pathname === '/' ? 'active' : null}`}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="transactions"
                    className={`link ${
                      pathname === '/transactions' ? 'active' : null
                    }`}>
                    Transactions
                  </NavLink>
                </li>
              </>
            )}
            <li className="close-menu" onClick={handleOpenMenu}>
              <UilTimes />
            </li>
          </ul>
        </section>
      ) : (
        <section className="navbar-bottom">
          <p>KasirKu</p>
          <UilApps className="iconMenu" onClick={handleOpenMenu} />
        </section>
      )}
    </header>
  );
}

export default NavWeb;

//
