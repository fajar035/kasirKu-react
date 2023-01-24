import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Users from './pages/Users';
import Transactions from './pages/transactions';
import Page404 from './pages/NotFound';

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/Transactions" element={<Transactions />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default MainRouter;
