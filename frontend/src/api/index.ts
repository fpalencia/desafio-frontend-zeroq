import axios from 'axios';

const apiOffices = axios.create({
  baseURL: 'http://localhost:3000',
});

export default apiOffices;