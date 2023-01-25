import NavWeb from '../Navbar/NavWeb';

function Layout({ children }) {
  return (
    <>
      <NavWeb />
      <main>{children}</main>
    </>
  );
}

export default Layout;
