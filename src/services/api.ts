import axios from 'axios';

export const apiUrl = axios.create({
  baseURL: 'http://localhost:3333'
})

export const apiCoins = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3'
})