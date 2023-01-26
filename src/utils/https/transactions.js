import axios from 'axios';

export const getAllTransactionsApi = () => {
  const url = `${process.env.REACT_APP_HOST}/api/transactions`;
  return axios.get(url);
};

export const addTransactionApi = (body) => {
  const url = `${process.env.REACT_APP_HOST}/api/transactions`;
  return axios.post(url, body);
};
