import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Transactions from './pages/transactions';
import Page404 from './pages/NotFound';
import Layout from './components/Layout';

function MainRouter() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/Transactions" element={<Transactions />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  );
}

export default MainRouter;
