const axios = require('axios');

const httpClient = axios.create({
  baseURL: 'https://gorest.co.in/public/v1',
  headers: {
    Authorization: `Bearer 1db9c9b6c959682be7c96f74ca532c3cb0bd331f46b86a92602f8d319481b6f5`,
    'Content-Type': 'application/json',
  },
});

module.exports = httpClient ;
