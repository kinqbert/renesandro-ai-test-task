import axios from 'axios';

const username = 'renesandro';
const password = 'qwerty1234';
const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

const apiClient = axios.create({
  baseURL: 'https://fasteasy-jvqis72guq-lm.a.run.app/tz-front/', 
  timeout: 10000,
  headers: {
    'Authorization': basicAuth,
    'Content-Type': 'application/json',
  },
});

export default apiClient;
