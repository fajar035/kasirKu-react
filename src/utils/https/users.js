import axios from 'axios';

export const getAllUsersApi = () => {
  const url = `${process.env.REACT_APP_HOST}/api/users`;
  return axios.get(url);
};
