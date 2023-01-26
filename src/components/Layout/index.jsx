import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavWeb from '../Navbar/NavWeb';
import Navmobile from '../Navbar/Navmobile';

function Layout({ children }) {
  const location = useLocation();
  const { pathname } = location;
  const [windowsSize, setWindowsSize] = useState(window.innerWidth);

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
    <>
      <NavWeb />
      {windowsSize < 800 && pathname !== '/transactions' ? <Navmobile /> : null}
      <main>{children}</main>
    </>
  );
}

export default Layout;
