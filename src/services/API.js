import axios from 'axios'

const API = axios.create({
  baseURL: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false",
});

export default API;
