/* eslint-disable prefer-const */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';
import { getAllTransactionsApi } from '../../utils/https/transactions';

import './styles.css';

const columns = [
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'date', label: 'Date', minWidth: 50 },
  {
    id: 'total',
    label: 'Total',
    minWidth: 50,
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [transaction, setTransaction] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getAllTransaction = useCallback(() => {
    getAllTransactionsApi()
      .then((res) => {
        let coba = [...res.data.data];
        coba.forEach((item, idx) => {
          const newDate = moment(item.date).format('dddd, DD-MM-YYYY, h:mm:ss');
          const newTotal = `Rp.${item.total}`;
          coba[idx].total = newTotal;
          coba[idx].date = newDate;
        });

        setTransaction(coba.reverse());
      })
      .catch(() => {
        return toast.error('Something went wrong !', {
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
  }, []);

  useEffect(() => {
    getAllTransaction();
  }, [getAllTransaction]);

  return (
    <div className="section-transaction">
      <h1>Transaction</h1>
      <Paper className="section-paper">
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="header-table">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: 'var(--text-color)',
                      color: 'var(--bg-primary)',
                      fontFamily: 'Nunito',
                    }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transaction
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={transaction.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
    </div>
  );
}
